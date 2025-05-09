<?php

namespace App\Http\Middleware;

use App\Models\PWDApplicationForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'is_verified' => PWDApplicationForm::where('user_id', Auth::id())->where('status', 'approved')->first() ? true : false,
                'role' => Auth::user()?->role,
                'is_account_completed' => Auth::user()?->first_name
            ],
        ];
    }
}
