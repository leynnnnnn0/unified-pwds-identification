<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ApiKey;
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
        $keys = ApiKey::where('user_id', 1)
            ->latest()
            ->paginate(10)
            ->through(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'secret_key' => $this->maskApiKey($item->secret_key),
                    'last_used' => 'Never',
                    'created_by' => Auth::user()?->full_name ?? 'test'
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


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['nullable']
        ]);

        do {
            $secretKey = 'sk-upid-' . Str::random(24);
        } while (ApiKey::where('secret_key', $secretKey)->exists());

        $key = ApiKey::create([
            'user_id' => 1,
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
