<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePWDRegistrationFormRequest;
use App\Http\Requests\UpdatePWDRegistrationFormRequest;
use App\Models\PWDApplicationForm;
use App\Models\SupportingDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PWDRegistrationController extends Controller
{
    public function index()
    {
        $applications = PWDApplicationForm::with('user')
            ->where('user_id', Auth::id())
            ->select(['id', 'application_number', 'application_date', 'status'])->paginate(10);

        return Inertia::render('PWDRegistration/Index', [
            'applications' => $applications,
        ]);
    }

    public function create()
    {
        return Inertia::render('PWDRegistration/Create');
    }

    public function show($id)
    {
        $application = PWDApplicationForm::with([
            'user',
            'disabilities',
            'causes_of_disabilities',
            'disabilities',
            'supporting_documents',
        ])->findOrFail($id);

        $image = Storage::url($application->photo);

        return Inertia::render('PWDRegistration/Edit', [
            'application' => $application,
            'image' => $image,
        ]);
    }

    public function edit($id)
    {
        $application = PWDApplicationForm::with([
            'user',
            'disabilities',
            'causes_of_disabilities',
            'disabilities',
            'supporting_documents',
        ])->findOrFail($id);

        $image = Storage::url($application->photo);

        return Inertia::render('PWDRegistration/Edit', [
            'application' => $application,
            'image' => $image,
        ]);
    }

    public function update(UpdatePWDRegistrationFormRequest $request, $id)
    {
        $validated = $request->validated();

        $application = PWDApplicationForm::findOrFail($id);

        DB::beginTransaction();
        if ($request->file('photo')) {
            $photo = $request->file('photo');
            $photoName = time() . '.' . $photo->getClientOriginalExtension();
            $photoPath = $photo->storeAs('1x1_pictures', $photoName, 'public');
            $validated['photo'] = $photoPath;

            if ($application->photo) {
                Storage::disk('public')->delete($application->photo);
            }
        }

        $application->update(Arr::except(
            $validated,
            ['disabilities', 'causes_of_disabilities', 'supporting_documents']
        ));

        $application->disabilities()->delete();
        $application->causes_of_disabilities()->delete();

        if (isset($validated['supporting_documents'])) {
            foreach ($validated['supporting_documents'] as $document) {
                $documentName = $document->getClientOriginalName() . time() .  '-' . '.' . $document->getClientOriginalExtension();
                $documentPath = $document->storeAs('supporting_documents', $documentName, 'public');
                $application->supporting_documents()->create([
                    'path' => $documentPath,
                    'name' => $documentName,
                ]);
            }
        }

        if (isset($validated['removed_documents'])) {
            foreach ($validated['removed_documents'] as $document) {
                $document = SupportingDocument::findOrFail($document);
                $document->delete();
                Storage::disk('public')->delete($document->path);
            }
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

    public function store(StorePWDRegistrationFormRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();
        $photo = $request->file('photo');
        $photoName = time() . '.' . $photo->getClientOriginalExtension();
        $photoPath = $photo->storeAs('1x1_pictures', $photoName, 'public');

        $validated['photo'] = $photoPath;

        $validated['user_id'] = Auth::id();
        $validated['encoder_id'] = Auth::id();
        $validated['application_number'] = 'PWD-' . time();
        $validated['application_date'] = now();

        $application = PWDApplicationForm::create(Arr::except(
            $validated,
            ['disabilities', 'causes_of_disabilities', 'supporting_documents', 'removed_documents']
        ));

        foreach ($validated['supporting_documents'] as $document) {
            $documentName = $document->getClientOriginalName() . time() .  '-' . '.' . $document->getClientOriginalExtension();
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
