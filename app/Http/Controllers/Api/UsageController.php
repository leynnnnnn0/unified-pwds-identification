<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ApiRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Container\Attributes\Auth as AttributesAuth;

class UsageController extends Controller
{
    public function index()
    {
        $endDate = Carbon::now();
        $startDate = Carbon::now()->subDays(30);

        $dailyStats = ApiRequest::where('user_id', Auth::id())
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(CASE WHEN is_successfull = 1 THEN 1 ELSE 0 END) as success'),
                DB::raw('SUM(CASE WHEN is_successfull = 0 THEN 1 ELSE 0 END) as failed')
            )
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->date,
                    'success' => (int)$item->success,
                    'failed' => (int)$item->failed
                ];
            });

        $transactions = ApiRequest::where('user_id', Auth::id())->with('api_key')->paginate(10)->through(function ($item) {
            return [
                'id' => $item->id,
                'method' => 'Get',
                'secret_key' => $this->maskApiKey($item->api_key->secret_key),
                'is_successfull' => true,
                'ip_address' => $item->ip_address,
                'created_at' => $item->created_at->format('F d, Y H:i:a')
            ];
        });




        return Inertia::render('Api/Usage/Index', [
            'usageStats' => $dailyStats,
            'transactions' => $transactions
        ]);
    }

    public function maskApiKey(string $apiKey, int $prefixChars = 8, int $suffixChars = 5): string
    {
        $length = strlen($apiKey);


        if ($length <= $prefixChars + $suffixChars) {
            return str_repeat('*', $length);
        }

        $prefix = substr($apiKey, 0, $prefixChars);
        $suffix = substr($apiKey, -$suffixChars);
        $maskedLength = $length - $prefixChars - $suffixChars;

        return $prefix . str_repeat('*', $maskedLength) . $suffix;
    }
}
