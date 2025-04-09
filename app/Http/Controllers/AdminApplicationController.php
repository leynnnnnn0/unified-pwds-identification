<?php

namespace App\Http\Controllers;

use App\Models\PWDApplicationForm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminApplicationController extends Controller
{
    public function index()
    {
        $applications = PWDApplicationForm::with('encoder')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(function ($item) {
                return [
                    'id' => $item->id,
                    'application_number' => $item->application_number,
                    'application_date' => $item->formatted_application_date,
                    'status' => strtoupper($item->status),
                    'encoder' => $item->encoder->username,
                    'type_of_registration' => $item->formatted_type_of_application,
                ];
            });
        return Inertia::render('AdminApplication/Index', [
            'applications' => $applications,
        ]);
    }
}
