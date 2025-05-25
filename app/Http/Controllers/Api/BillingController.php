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
            'prod_SNI80ZLixxP3rF' => [
                'name' => 'Silver',
                'price' => 250,
                'price_id' => 'price_1RSXXwH0KVHxP8CWG3wU4tdo',
                'request_limit' => 100,
                'product_id' => 'prod_SNI80ZLixxP3rF'
            ],
            'prod_SNI9VrXaBAq2RS' => [
                'name' => 'Gold',
                'price' => 310,
                'request_limit' => 250,
                'price_id' => 'price_1RSXZHH0KVHxP8CWF0uijlO8 ',
                'product_id' => 'prod_SNI9VrXaBAq2RS'
            ],
            'prod_SNIAVjsfZC3fZ2 ' => [
                'name' => 'Platinum',
                'price' => 380,
                'request_limit' => 'Unlimited',
                'price_id' => 'price_1RSXZxH0KVHxP8CWFMNMENE7',
                'product_id' => 'prod_SNIAVjsfZC3fZ2 '
            ],
        ];

        $subscription = null;

        $user = Auth::user();
        if ($user->subscribed('prod_SNI80ZLixxP3rF')) {
            $subscription = $subscriptions['prod_SNI80ZLixxP3rF'];
        }
        if ($user->subscribed('prod_SNI9VrXaBAq2RS')) {
            $subscription = $subscriptions['prod_SNI9VrXaBAq2RS'];

            // $subscription = $user->subscription('prod_SNI9VrXaBAq2RS');

            // // Swap to Platinum price
            // $subscription->swap('price_1RSXZxH0KVHxP8CWFMNMENE7');

            // // Update the subscription name (product ID)
            // $subscription->type = 'prod_SNIAVjsfZC3fZ2 ';
            // $subscription->save();
        }
        if ($user->subscribed('prod_SNIAVjsfZC3fZ2 ')) {
            $subscription = $subscriptions['prod_SNIAVjsfZC3fZ2 '];
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
