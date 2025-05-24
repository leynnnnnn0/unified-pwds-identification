<?php

namespace App\Http\Controllers;

use App\Models\PWDApplicationForm;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

        $chartData = $this->getChartData();

        return Inertia::render('AdminDashboard/Index', [
            'counts' => $counts,
            'chartData' => $chartData,
        ]);
    }

    private function getChartData()
    {
        $endDate = Carbon::now();
        $startDate = Carbon::now()->subMonths(3);

        $dateRange = [];
        $currentDate = $startDate->copy();

        while ($currentDate->lte($endDate)) {
            $dateRange[] = $currentDate->format('Y-m-d');
            $currentDate->addDay();
        }


        $applications = PWDApplicationForm::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('COUNT(*) as count')
        )
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<=', $endDate)
            ->groupBy(DB::raw('DATE(created_at)'))
            ->pluck('count', 'date')
            ->toArray();

        $chartData = [];
        foreach ($dateRange as $date) {
            $count = $applications[$date] ?? 0;

            $chartData[] = [
                'date' => $date,
                'applications' => $count,
                'desktop' => $count, 
                'mobile' => 0, 
            ];
        }

        return $chartData;
    }

    public function getApplicationStats()
    {
        $stats = [
            'total_applications' => PWDApplicationForm::count(),
            'pending_applications' => PWDApplicationForm::where('status', 'pending')->count(),
            'approved_applications' => PWDApplicationForm::where('status', 'approved')->count(),
            'rejected_applications' => PWDApplicationForm::where('status', 'rejected')->count(),
            'this_month' => PWDApplicationForm::whereMonth('created_at', Carbon::now()->month)
                ->whereYear('created_at', Carbon::now()->year)
                ->count(),
            'last_month' => PWDApplicationForm::whereMonth('created_at', Carbon::now()->subMonth()->month)
                ->whereYear('created_at', Carbon::now()->subMonth()->year)
                ->count(),
        ];

        return response()->json($stats);
    }
}
