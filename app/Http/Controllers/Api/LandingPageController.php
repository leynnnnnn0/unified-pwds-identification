<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function index()
    {
        return Inertia::render('Api/LandingPage');
    }

    public function show()
    {
        return Inertia::render('Api/Documentation');
    }
}
