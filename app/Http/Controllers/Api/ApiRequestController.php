<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ApiKey;
use App\Models\ApiRequest;
use App\Models\PWDIdentificationCard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Laravel\Cashier\Subscription;

class ApiRequestController extends Controller
{
    public function show(Request $request)
    {
        $subscriptions = $this->subscriptions();
        $secret_key = request('secret_key');
        $card_uid = request('card_uid');

        // Check if the ip address is existing on the database
        $api_key = ApiKey::where('secret_key', $secret_key)->first();

        if (!$api_key) {
            return response()->json([
                'success' => false,
                'is_found' => null,
                'message' => 'Unknown API key'
            ], 403);
        }

        // Check if user has an existing subscription
        $user_subscription = Subscription::where('user_id', $api_key->user_id)
            ->where('stripe_status', 'active')->first();

        if (!$user_subscription) {
            return response()->json([
                'success' => false,
                'is_found' => null,
                'message' => 'Please subscribe to one of our subscriptions to be able to send a request.'
            ], 403);
        }

        $result = PWDIdentificationCard::with('application_form')
            ->where('rfid_card_number', $card_uid)
            ->where('pwd_card_number', $card_uid)
            ->first();

        // If pwd id exists
        if (!$result) {
            DB::beginTransaction();
            ApiRequest::create([
                'user_id' => $api_key->user_id,
                'ip_address' =>  $request->ip(),
                'api_key_id' => $api_key->id,
            ]);

            $api_key->successful_requests += 1;
            $api_key->save();

            DB::commit();
            return response()->json([
                'success' => true,
                'is_found' => false,
                'data' => []
            ]);
        }

        // If it exist
        DB::beginTransaction();
        ApiRequest::create([
            'user_id' => $api_key->user_id,
            'ip_address' =>  $request->ip(),
            'api_key_id' => $api_key->id,
        ]);

        $api_key->successful_requests += 1;
        $api_key->save();

        DB::commit();
        return response()->json([
            'api_key' => $api_key,
            'success' => true,
            'is_found' => false,
            'data' => [
                'card_holder' => $result->application_form->first_name . ' ' . $result->application_form->last_name,
                'effective_date' => $result->effective_date,
                'expiry_date' => $result->expiry_date,
            ]
        ]);
    }

    public function subscriptions()
    {
        return  [
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
                'request_limit' => 50,
                'price_id' => 'price_1RNo47H0KVHxP8CWpWPOA9Zs',
                'product_id' => 'prod_SIOrkY2gJyW45l'
            ],
            'prod_SIOt2uy0I2upNo' => [
                'name' => 'Platinum',
                'price' => 20,
                'request_limit' => 'Unlimited',
                'price_id' => 'price_1RNo5aH0KVHxP8CWIQvMeBaD',
                'product_id' => 'prod_SIOt2uy0I2upNo'
            ],
        ];
    }
}
