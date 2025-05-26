<?php

namespace App\Http\Controllers;

use App\Models\ApiRequest;
use App\Models\PWDIdentificationCard;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Laravel\Cashier\Subscription;

class ApiIdVerificationController extends Controller
{
    public function index()
    {
        return Inertia::render('ApiIDVerification/Index');
    }

    public function verify(Request $request)
    {
        $subscriptions = $this->subscriptions();
        // Check if the user has an existing plan
        $user_subscription = Subscription::where('user_id', Auth::id())
            ->where('stripe_status', 'active')->first();

        // If none
        if (!$user_subscription) {
            return response()->json([
                'success' => false,
                'data' => [
                    'is_found' => null,
                ],
                'message' => 'Please subscribe to one of our subscriptions to be able to send a request.'
            ], 403);
        }

        // If limit reached

        $user = Auth::user()->load(['subscriptions']);
        $plan = $user->subscriptions->where('stripe_status', 'active')->first();

        $request_count = $user->api_requests
            ->where('is_successfull', true)
            ->whereBetween('created_at', [$plan->created_at, Carbon::parse($plan->created_at)->addMonth()])
            ->count();

        $is_max_request_reached = $request_count == $subscriptions[$plan->type]['request_limit'];

        if ($is_max_request_reached) {

            return response()->json([
                'success' => false,
                'data' => [
                    'is_found' => null,
                ],
                'message' => 'Max request limit reached.'
            ], 403);
        }

        $card_uid = $request->input('card_uid');

        // If they do, look for the id 

        
        $result = PWDIdentificationCard::with('application_form')
            ->where('expiry_date', '>=', Carbon::now())
            ->where('rfid_card_number', $card_uid)
            ->orWhere('pwd_card_number', $card_uid)
            ->first();

        if (!$result) {
            DB::beginTransaction();
            ApiRequest::create([
                'user_id' => Auth::id(),
                'ip_address' =>  request()->ip(),
                'api_key_id' => null,
            ]);

            DB::commit();
            return response()->json([
                'success' => true,
                'data' => [
                    'is_found' => false,
                ]
            ]);
        }

        DB::beginTransaction();
        ApiRequest::create([
            'user_id' => Auth::id(),
            'ip_address' =>  request()->ip(),
            'api_key_id' => null,
        ]);


        DB::commit();
        return response()->json([
            'success' => true,
            'data' => [
                'is_found' => true,
                'card_details' => [
                    'card_holder' => $result->application_form->first_name . ' ' . $result->application_form->last_name,
                    'effective_date' => $result->effective_date,
                    'expiry_date' => $result->expiry_date,
                ]
            ]
        ]);
    }

    public function subscriptions()
    {
        return  [
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
    }
}
