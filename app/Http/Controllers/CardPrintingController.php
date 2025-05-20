<?php

namespace App\Http\Controllers;

use App\Models\PWDIdentificationCard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CardPrintingController extends Controller
{
    public function index()
    {
        $cards = PWDIdentificationCard::with('application_form')->paginate(10);
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
            'cards' => $cards
        ]);
    }
}
