<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Cashier\Subscription;

class BillingController extends Controller
{
    public function index()
    {
        $subscriptions = [
            'prod_SIOpCxb9QabHGm' => [
                'name' => 'Silver',
                'price' => 10,
                'price_id' => 'price_1RNo2DH0KVHxP8CWfAcg2ohS',
                'request_limit' => 20,
                'product_id' => 'prod_SIOpCxb9QabHGm'
            ],
            'prod_SIOrkY2gJyW45l' => [
                'name' => 'Gold',
                'price' => 15,
                'price_id' => 'price_1RNo47H0KVHxP8CWpWPOA9Zs',
                'request_limit' => 50,
                'product_id' => 'prod_SIOrkY2gJyW45l'
            ],
            'prod_SIOt2uy0I2upNo' => [
                'name' => 'Platinum',
                'price' => 20,
                'price_id' => 'price_1RNo5aH0KVHxP8CWIQvMeBaD',
                'product_id' => 'prod_SIOt2uy0I2upNo'
            ],
        ];

        $subscription = null;

        $user = Auth::user();
        if ($user->subscribed('prod_SIOpCxb9QabHGm')) {
            $subscription = $subscriptions['prod_SIOpCxb9QabHGm'];
        }
        if ($user->subscribed('prod_SIOrkY2gJyW45l')) {
            $subscription = $subscriptions['prod_SIOrkY2gJyW45l'];
        }
        if ($user->subscribed('prod_SIOt2uy0I2upNo')) {
            $subscription = $subscriptions['prod_SIOt2uy0I2upNo'];
        }

        if ($subscription) {
            $user->load(['subscriptions', 'api_requests']);

            $plan = $user->subscriptions->where('stripe_status', 'active')->first();

            $subscription['api_requests'] = $user->api_requests
                ->where('is_successfull', true)
                ->whereBetween('created_at', [$plan->created_at, Carbon::parse($plan->created_at)->addMonth()])
                ->count();

            $subscription['is_cancelled'] = $plan->ends_at != null;

            $subscription['start_date'] = Carbon::parse($plan->created_at)->format('F d, Y');
            $subscription['end_date'] = Carbon::parse($plan->created_at)->addMonth()->format('F d, Y');
        }

        // Get invoices from Stripe via Cashier
        $invoices = $user->invoices();

        // Format the invoices for frontend display
        $formattedInvoices = [];
        foreach ($invoices as $invoice) {
            $formattedInvoices[] = [
                'id' => $invoice->id,
                'invoice_id' => $invoice->number,
                'amount' => $invoice->total(),
                'amount_formatted' => $invoice->total(),
                'date' => Carbon::parse($invoice->date())->format('F d, Y'),
                'status' => $invoice->status,
                'pdf_url' => $invoice->asStripeInvoice()->invoice_pdf,
            ];
        }


        return Inertia::render('Api/Billing/Index', [
            'subscription' => $subscription,
            'invoices' => $formattedInvoices
        ]);
    }

    public function cancelSubscription($plan)
    {
        Auth::user()->subscription($plan)->cancel();
        return back();
    }

    public function renewSubscription($plan)
    {
        Auth::user()->subscription($plan)->reorder();
        return back();
    }
}
