<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePWDRegistrationFormRequest;
use App\Models\PWDApplicationForm;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PWDRegistrationController extends Controller
{
    public function index()
    {
        $applications = PWDApplicationForm::with('user')->select(['id', 'application_number', 'application_date', 'status'])->paginate(10);

        return Inertia::render('PWDRegistration/Index', [
            'applications' => $applications,
        ]);
    }

    public function create()
    {
        return Inertia::render('PWDRegistration/Create');
    }

    public function store(StorePWDRegistrationFormRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();
        $photo = $request->file('photo');
        $photoName = time() . '.' . $photo->getClientOriginalExtension();
        $photoPath = $photo->storeAs('1x1_pictures', $photoName, 'public');

        $validated['photo'] = $photoPath;

        $validated['user_id'] = 1;
        $validated['encoder_id'] = 1;
        $validated['application_number'] = 'PWD-' . time();
        $validated['application_date'] = now();

        $application = PWDApplicationForm::create(Arr::except(
            $validated,
            ['disabilities', 'causes_of_disabilities', 'supporting_documents']
        ));

        foreach ($validated['supporting_documents'] as $document) {
            $documentName = time() . '-' . $document->getClientOriginalExtension();
            $documentPath = $document->storeAs('supporting_documents', $documentName, 'public');
            $application->supporting_documents()->create([
                'path' => $documentPath,
                'name' => $documentName,
            ]);
        }
        foreach ($validated['type_of_disabilities'] as $disability) {
            $application->disabilities()->create([
                'name' => $disability,
            ]);
        }
        foreach ($validated['cause_of_disabilities'] as $cause) {
            $application->causes_of_disabilities()->create([
                'name' => $cause,
            ]);
        }
        DB::commit();
        return to_route('registration.index');
    }
}
