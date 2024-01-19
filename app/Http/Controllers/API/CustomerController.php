<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{

    public function customerProfile()
    {
    }


    public function productList()
    {
        $products = Product::all();
        return response()->json(['success' => true, 'data' => $products], 200);
    }


    public function addCart($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['success' => false, 'message' => 'Unable to add cart'], 400);
        }
        $user = auth()->user();
        if (!empty($user)) {
            $product = Product::findOrFail($id);
            $isExistcart = Cart::where('product_id', $id)
                ->where('customer_id', Auth::id())
                ->first();

            if ($isExistcart) {
                $newQuantity = $isExistcart->quantity + 1;
                $newSubtotal = $product->price * $newQuantity;
                // Update the existing cart record with new quantity and subtotal
                $isExistcart->update([
                    'quantity' => $newQuantity,
                    'subtotal' => $newSubtotal,
                ]);
            } else {
                $cart = new Cart([
                    'product_id' =>  $id,
                    'customer_id' => Auth::id(),
                    'product_name' => $product->name,
                    'image' => $product->image,
                    'price' => $product->price,
                    'stocks' => $product->stocks,
                    'quantity' => 1,
                    'subtotal' => $product->price
                ]);
                $cart->save();
            }
            return response()->json(['success' => true, "message" => 'Added in cart'], 200);
        } else {
            return response()->json(['success' => false, "message" => 'Unauthorized action'], 400);
        }
    }

    public function viewCart()
    {
        $user = auth()->user();
        if (!empty($user)) {
            $cartProducts = Cart::where('customer_id', Auth::id())->get();
            return response()->json(['success' => true, "data" => $cartProducts], 200);
        } else {
            return response()->json(['success' => false, "message" => 'Unauthorized action'], 400);
        }
    }

    public function updateCart($type, $id)
    {

        $cart = Cart::find($id);
        $product = Product::find($cart->product_id);
        if (!$product) {
            return response()->json(['success' => false, 'message' => 'Product not found'], 400);
        }

        $user = auth()->user();
        if (!empty($user)) {
            $updateCart = Cart::where('id', $id)
                ->where('customer_id', Auth::id())
                ->first();

            if ($updateCart) {
                if ($type == 'plus' && $updateCart->quantity < $product->stocks) {
                    $newQuantity = $updateCart->quantity + 1;
                    $newSubtotal = $product->price * $newQuantity;
                    // Update the existing cart record with new quantity and subtotal
                    $updateCart->update([
                        'quantity' => $newQuantity,
                        'subtotal' => $newSubtotal,
                    ]);
                } elseif ($type == 'minus' && $updateCart->quantity > 1) {
                    $newQuantity = $updateCart->quantity - 1;
                    $newSubtotal = $product->price * $newQuantity;
                    $updateCart->update([
                        'quantity' => $newQuantity,
                        'subtotal' => $newSubtotal,
                    ]);
                }
                return response()->json(['success' => true, "data" => $cart], 200);
            }
        } else {
            return response()->json(['success' => false, "message" => 'Unauthorized action'], 400);
        }
    }

    public function removeCart($id)
    {
        $user = auth()->user();
        if (!empty($user)) {
            $cart = Cart::find($id);
            if (!$cart) {
                return response()->json(['success' => false, 'message' => 'Product not found'], 400);
            }
            Cart::where('id', $id)->delete();
            return response()->json(['success' => true, "message" => "Product removed from cart"], 200);
        }
    }
}
