<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        if (!Auth::check()) return redirect()->route('api.login');
        return $request->user()
            ->newSubscription(request('product'), request('plan'))
            ->checkout([
                'success_url' => route('billing.index'),
                'cancel_url' => route('billing.index')
            ]);
    }
}
