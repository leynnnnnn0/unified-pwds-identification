<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PWDProfileController extends Controller
{
    public function index()
    {
        return Inertia::render('PWDProfile/Index');
    }
}
