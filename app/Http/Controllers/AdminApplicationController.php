<?php

namespace App\Http\Controllers;

use App\Models\PWDApplicationForm;
use App\Models\PWDIdentificationCard;
use App\Models\SupportingDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;

class AdminApplicationController extends Controller
{
    public function index()
    {
        $query = PWDApplicationForm::with('encoder');

        $user = Auth::user();
        $user->load(['municipalities']);


        if ($user->role === 'processer') {
            $query->whereIn('municipality', $user->municipalities()->pluck('municipality'));
        }


        $applications = $query->orderBy('created_at', 'desc')
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

    public function updateDocumentDetails(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required',
            'remarks' => 'required|string|max:255',
        ]);

        $document = SupportingDocument::find($id);
        $document->update([
            'status' => $validated['status'],
            'remarks' => $validated['remarks'],
        ]);

        return back();
    }

    public function updateApplicationStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required',
            'remarks' => 'required|string|max:255',
        ]);

        $application = PWDApplicationForm::find($id);
        $application->update([
            'status' => $validated['status'],
            'remarks' => $validated['remarks'],
        ]);

        return back();
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

        return Inertia::render('AdminApplication/Show', [
            'application' => $application,
            'image' => $image,
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
            'rfid_card_number' => 'required|unique:pwd_identification_cards,rfid_card_number',
            'pwd_card_number' => 'required|unique:pwd_identification_cards,pwd_card_number',
            'effective_date' => 'required|date',
            'expiry_date' => 'required|date|after:effective_date',
        ]);

        PWDIdentificationCard::create($validated);
        PWDApplicationForm::where('id', $validated['application_form_id'])
            ->update(['status' => 'approved']);

        return redirect()->route('admin.applications.index');
    }
}
