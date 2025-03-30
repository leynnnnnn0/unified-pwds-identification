<?php

namespace App\Http\Controllers;

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
}
