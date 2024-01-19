<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Payment;

use Illuminate\Http\Request;
use Razorpay\Api\Api;

class RazorpayController extends Controller
{
    public function razorpay(Request $request)
    {
        if (!empty($request->razorpay_payment_id)) {
            $api = new Api(env('RAZORPAY_KEY_ID'), env('RAZORPAY_KEY_SECRET'));
            $payment =  $api->payment->fetch($request->razorpay_payment_id);
            $response = $payment->capture(array('amount' => $payment->amount));

            if ($response['captured']) {
                $user = auth()->user();
                $cartProducts = Cart::where('customer_id', $user->id)->get();

                foreach ($cartProducts as $cartProduct) {
                    $payments = new Payment;
                    $payments->payment_id = $response['id'];
                    $payments->product_name = $cartProduct->product_name;
                    $payments->quantity = $cartProduct->quantity;
                    $payments->amount = $cartProduct->subtotal;
                    $payments->currency = $response['currency'];
                    $payments->customer_name = $user->name;
                    $payments->customer_email = $user->email;
                    $payments->payment_status = $response['status'];
                    $payments->payment_method =  $response['method'];
                    $payments->save();
                }

                Cart::where('customer_id', $user->id)->delete();
                return response()->json(['success' => true, 'message' => "Payment sucess"], 200);
            }
        }
    }
}
