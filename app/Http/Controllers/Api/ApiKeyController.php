<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ApiKey;
use App\Models\ApiRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

use function Pest\Laravel\json;

class ApiKeyController extends Controller
{
    public function index()
    {
        $keys = ApiKey::with('user')->where('user_id', Auth::id())
            ->latest()
            ->paginate(10)
            ->through(function ($item) {
                $result = ApiRequest::where('api_key_id', $item->id)->first()?->created_at->format('F d, Y H:i:a');
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'secret_key' => $this->maskApiKey($item->secret_key),
                    'last_used' =>  $result ?: "Never",
                    'created_by' => $item->user->username
                ];
            });

        return Inertia::render('Api/APIKeys/Index', [
            'keys' => $keys
        ]);
    }

    public function destroy($id)
    {
        ApiKey::findOrFail($id)->delete();
        return back();
    }

    public function maskApiKey(string $apiKey, int $visiblePrefix = 8, int $visibleSuffix = 5): string
    {
        $length = strlen($apiKey);
        $maxVisible = $visiblePrefix + $visibleSuffix;

        // If the key is shorter than our desired display length, mask everything
        if ($length <= $maxVisible) {
            return str_repeat('*', min(18, $length));
        }

        $prefix = substr($apiKey, 0, $visiblePrefix);
        $suffix = substr($apiKey, -$visibleSuffix);

        // Calculate how many asterisks we need to reach exactly 18 characters
        $maskLength = 18 - ($visiblePrefix + $visibleSuffix);

        return $prefix . str_repeat('*', $maskLength) . $suffix;
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['nullable']
        ]);

        do {
            $secretKey = 'sk-upid-' . Str::random(24);
        } while (ApiKey::where('secret_key', $secretKey)->exists());

        $key = ApiKey::create([
            'user_id' => Auth::id(),
            'name' => $validated['name'] ?? 'Secret key',
            'secret_key' => $secretKey
        ]);

        return response()->json([
            'success' => true,
            'key' => $key->secret_key,
            'key_id' => $key->id
        ]);
    }
}
