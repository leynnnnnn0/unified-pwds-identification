<?php

namespace App\Http\Controllers;

use App\Models\PWDApplicationForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

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
        ])->where('user_id', Auth::id())
            ->where('status', 'approved')
            ->latest()
            ->first();

        $image = Storage::url($application->photo);

        return Inertia::render('PWDProfile/Index', [
            'application' => $application,
            'image' => $image,
        ]);
    }
}
