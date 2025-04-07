<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePWDRegistrationFormRequest;
use App\Models\PWDApplicationForm;
use Illuminate\Http\Request;
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

        $validated['photo'] = null;
        $validated['user_id'] = 1;
        $validated['encoder_id'] = 1;
        $validated['application_number'] = 'PWD-0001';
        $validated['application_date'] = now();

        PWDApplicationForm::create($validated);

        return to_route('registration.index');
    }
}
