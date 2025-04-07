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
        return Inertia::render('PWDRegistration/Index');
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
        PWDApplicationForm::create(
            $validated
        );

        return to_route('registration.index');
    }
}
