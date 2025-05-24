<?php

namespace App\Http\Controllers;

use App\Models\PWDApplicationForm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $counts = PWDApplicationForm::selectRaw('
                COUNT(*) as total,
                SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN status = "approved" THEN 1 ELSE 0 END) as approved,
                SUM(CASE WHEN status = "rejected" THEN 1 ELSE 0 END) as rejected,
                SUM(CASE WHEN status = "incomplete" THEN 1 ELSE 0 END) as incomplete
            ')
            ->first();

        return Inertia::render('AdminDashboard/Index', [
            'counts' => $counts
        ]);
    }
}
