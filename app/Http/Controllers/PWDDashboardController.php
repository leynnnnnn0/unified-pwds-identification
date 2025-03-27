<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PWDDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('PWDDashboard/Index');
    }
}
