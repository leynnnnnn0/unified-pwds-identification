<?php

namespace App\Http\Controllers;

use App\Models\PWDApplicationForm;
use App\Models\PWDIdentificationCard;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;

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

    public function show($id)
    {
        return Inertia::render('AdminApplication/Show', [
            'application' => PWDApplicationForm::with('encoder')->find($id),
        ]);
    }

    public function process($id)
    {
        $cardDetails = [
            'application_form_id' => $id,
            'pwd_card_number' => Uuid::uuid4()->toString(),
            'effective_date' => now()->format('Y-m-d'),
            'expiry_date' => now()->addYears(5)->format('Y-m-d'),

        ];
        return Inertia::render('AdminApplication/Process', [
            'application' => PWDApplicationForm::with('encoder')->find($id),
            'cardDetails' => $cardDetails,
        ]);
    }

    public function storeIdentificationCard(Request $request)
    {
        $validated = $request->validate([
            'application_form_id' => 'required|exists:pwd_application_forms,id',
            'rfid_number' => 'required|unique:pwd_identification_cards,rfid_number',
            'pwd_card_number' => 'required|unique:pwd_identification_cards,pwd_card_number',
            'effective_date' => 'required|date',
            'expiry_date' => 'required|date|after:effective_date',
        ]);

        PWDIdentificationCard::create($validated);
        PWDApplicationForm::where('id', $validated['application_form_id'])
            ->update(['status' => 'APPROVED']);

        return redirect()->route('admin.applications.index');
    }
}
