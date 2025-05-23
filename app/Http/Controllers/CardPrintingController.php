<?php

namespace App\Http\Controllers;

use App\Models\PWDIdentificationCard;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class CardPrintingController extends Controller
{
    public function index()
    {

        $search = request('search');
        $cards = PWDIdentificationCard::with('application_form')
            ->where('is_printed', false)
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('pwd_card_number', 'like', "%$search%")
                        ->orWhereHas('application_form', function ($q) use ($search) {
                            $q->where('application_number', 'like', "%$search%");
                        });
                });
            })
            ->latest()
            ->paginate(10);

        $cards = $cards->through(function ($item) {
            $application_form = $item->application_form;
            return [
                'id' => $item->id,
                'application_form_number' => $application_form->application_number,
                'pwd_card_number' => $item->pwd_card_number,
                'card_holder' => $application_form->full_name,
                'effective_date' => $item->effective_date
            ];
        });

        return Inertia::render('CardPrinting/Index', [
            'cards' => $cards,
            'filters' => request()->only(['search'])
        ]);
    }


    public function generateIdCardPdf($id)
    {
        $card = PWDIdentificationCard::with('application_form')->findOrFail($id);
        $application_form = $card->application_form;

        // Get the photo URL
        $photoPath = $application_form->photo_path;
        $photoUrl = null;

        if ($photoPath && Storage::exists($photoPath)) {
            $photoUrl = 'data:image/jpeg;base64,' . base64_encode(Storage::get($photoPath));
        }

        $cardData = [
            'id' => $card->id,
            'application_form_number' => $application_form->application_number,
            'pwd_card_number' => $card->pwd_card_number,
            'card_holder' => $application_form->full_name,
            'effective_date' => Carbon::parse($card->effective_date)->format('M d, Y'),
            'photo_url' => $photoUrl,
            'address' => $application_form->address ?? 'N/A',
            'birthdate' => $application_form->birthdate ? Carbon::parse($application_form->birthdate)->format('M d, Y') : 'N/A',
            'gender' => $application_form->gender ?? 'N/A',
            'disability_type' => $application_form->disability_type ?? 'N/A',
            'blood_type' => $application_form->blood_type ?? 'N/A',
            'emergency_contact_person' => $application_form->emergency_contact_person ?? 'N/A',
            'emergency_contact_number' => $application_form->emergency_contact_number ?? 'N/A',
        ];

        $pdf = Pdf::loadView('pdf.pwd-id-card', $cardData);

        $pdf->setPaper([0, 0, 242.65, 153.01]);

        $pdf->setOptions([
            'dpi' => 300,
            'defaultFont' => 'sans-serif',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true
        ]);

        return $pdf->stream('pwd-id-card-' . $card->pwd_card_number . '.pdf');
    }

    public function printCard($id)
    {
        $card = PWDIdentificationCard::with('application_form')->findOrFail($id);
        $application_form = $card->application_form;

        $cardData = [
            'id' => $card->id,
            'application_form_number' => $application_form->application_number,
            'pwd_card_number' => $card->pwd_card_number,
            'card_holder' => $application_form->full_name,
            'effective_date' => $card->effective_date,
            'photo' => Storage::url($application_form->photo),
            'address' => $application_form->address ?? 'N/A',
            'birthdate' => $application_form->birthdate ?? 'N/A',
            'gender' => $application_form->gender ?? 'N/A',
            'disabilities' => $application_form->disabilities_list,
            'blood_type' => $application_form->blood_type ?? 'N/A',
            'emergency_contact_person' => $application_form->emergency_contact_person ?? 'N/A',
            'emergency_contact_number' => $application_form->emergency_contact_number ?? 'N/A',
            'qr' => 'data:image/svg+xml;base64,' . base64_encode(
                QrCode::format('svg')
                    ->size(300)
                    ->color(10, 10, 10)
                    ->backgroundColor(255, 255, 255)
                    ->margin(1)
                    ->generate($card->rfid_card_number)
            )
        ];


        return Inertia::render('CardPrinting/PrintCard', [
            'cardData' => $cardData
        ]);
    }

    public function batchPrint(Request $request)
    {
        $ids = $request->input('ids', []);

        $cards = PWDIdentificationCard::with('application_form')
            ->whereIn('id', $ids)
            ->get()
            ->map(function ($card) {
                $application_form = $card->application_form;
                return [
                    'id' => $card->id,
                    'application_form_number' => $application_form->application_number,
                    'pwd_card_number' => $card->pwd_card_number,
                    'card_holder' => $application_form->full_name,
                    'effective_date' => $card->effective_date,
                    'photo' => Storage::url($application_form->photo),
                    'address' => $application_form->address ?? 'N/A',
                    'birthdate' => $application_form->birthdate ?? 'N/A',
                    'gender' => $application_form->gender ?? 'N/A',
                    'disabilities' => $application_form->disabilities_list,
                    'blood_type' => $application_form->blood_type ?? 'N/A',
                    'emergency_contact_person' => $application_form->emergency_contact_person ?? 'N/A',
                    'emergency_contact_number' => $application_form->emergency_contact_number ?? 'N/A',
                    'qr' => 'data:image/svg+xml;base64,' . base64_encode(
                        QrCode::format('svg')
                            ->size(300)
                            ->color(10, 10, 10)
                            ->backgroundColor(255, 255, 255)
                            ->margin(1)
                            ->generate($card->rfid_card_number)
                    )
                ];
            });

        return Inertia::render('CardPrinting/BatchPrint', [
            'cards' => $cards
        ]);
    }

    public function markAsPrinted($id)
    {
        $card = PWDIdentificationCard::findOrFail($id);
        $card->update(['is_printed' => true]);

        return redirect()->route('admin.card-printing.index')->with('success', 'Card marked as printed successfully.');
    }


    public function markAllAsPrinted(Request $request)
    {
        $ids = $request->input('ids', []);

        PWDIdentificationCard::whereIn('id', $ids)->update(['is_printed' => true]);

        return redirect()->route('admin.card-printing.index')->with('success', 'Cards marked as printed successfully.');
    }
}
