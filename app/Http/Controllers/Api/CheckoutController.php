<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $plan = "price_1RNo2DH0KVHxP8CWfAcg2ohS")
    {
        return $request->user()
            ->newSubscription('prod_SIOpCxb9QabHGm', $plan)
            ->checkout([
                'success_url' => route('landing-page'),
                'cancel_url' => route('landing-page')
            ]);
    }
}
