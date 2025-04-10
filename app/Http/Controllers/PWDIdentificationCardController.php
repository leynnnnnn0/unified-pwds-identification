<?php

namespace App\Http\Controllers;

use App\Models\PWDIdentificationCard;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class PWDIdentificationCardController extends Controller
{
    public function show()
    {
        $card_number = request('card_number');





        $pwdIdentificationCard = PWDIdentificationCard::with('application_form')
            ->where('rfid_card_number', $card_number)
            ->orWhere('pwd_card_number', $card_number)
            ->first();

        if (!$pwdIdentificationCard) return response()->json([
            'message' => 'No Data Found',
            'isFound' => false,
            'data' => []
        ]);

        return response()->json([
            'message' => 'Data Found',
            'isFound' => true,
            'data' => Collection::make([
                'card_holder' => $pwdIdentificationCard->application_form->first_name . ' ' . $pwdIdentificationCard->application_form->last_name,
                'effective_date' => $pwdIdentificationCard->formatted_effective_date,
                'expiry_date' => $pwdIdentificationCard->formatted_expiry_date,
            ])
        ]);
    }
}
