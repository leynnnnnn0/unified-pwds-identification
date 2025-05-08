<?php

namespace App\Http\Controllers;

use App\Models\PWDApplicationForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class PWDProfileController extends Controller
{
    public function index()
    {
        $application = PWDApplicationForm::with([
            'user',
            'disabilities',
            'causes_of_disabilities',
            'disabilities',
            'supporting_documents',
            'pwd_identification_card'
        ])->where('user_id', Auth::id())
            ->where('status', 'approved')
            ->latest()
            ->first();

        $image = Storage::url($application->photo);


        $qr = 'data:image/svg+xml;base64,' . base64_encode(
            QrCode::format('svg')
                ->size(300)
                ->color(10, 10, 10)
                ->backgroundColor(255, 255, 255)
                ->margin(1)
                ->generate($application->pwd_identification_card->rfid_card_number)
        );


        return Inertia::render('PWDProfile/Index', [
            'application' => $application,
            'image' => $image,
            'qr' => $qr
        ]);
    }
}
