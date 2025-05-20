<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CardPrintingController extends Controller
{
    public function index()
    {
        return Inertia::render('CardPrinting/Index');
    }
}
