<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminApplicationController extends Controller
{
    public function index()
    {
        return Inertia::render('AdminApplication/Index');
    }
}
