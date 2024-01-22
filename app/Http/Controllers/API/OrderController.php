<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if (!empty($user)) {
            if ($user->role_id != 1) {
                return response()->json(['success' => false, 'message' => 'Unauthorized action'], 400);
            }
            $orders = Order::all();

            if ($orders) {
                foreach ($orders as $order) {
                    $product = Product::find($order->product_id);
                    $customer = User::find($order->customer_id);
                    $order->product_details = $product;
                    $order->customer_details = $customer;
                    unset($order->product_id, $order->customer_id, $order->payment_id, $order->payment_method);
                }
                return response()->json(['success' => true, 'data' => $orders], 200);
            }
        }
    }
    public function edit()
    {
    }
}
