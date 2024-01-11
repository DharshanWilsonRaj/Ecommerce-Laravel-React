<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{


    public function index()
    {
        $user = Auth::user();
        if ($user->role_id != 1) {
            return response()->json(['message' => 'Unauthenticate request', 'success' => false], 200);
        };
        $products = Product::all();
        return response()->json(['data' => $products,  'success' => true], 200);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        if ($user->role_id != 1) {
            return response()->json(['message' => 'Unauthenticate request', 'success' => false], 200);
        };
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stocks' => 'required|numeric',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors(), 'success' => false], 200);
        }

        $product = new Product([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'stocks' => $request->input('stocks'),
            'description' => $request->input('description'),
        ]);

        if ($request->hasFile('image')) {
            $imageFolder = 'product_images';
            $request->file('image')->move(public_path($imageFolder), $request->file('image')->getClientOriginalName());
            $product->image = "/" . $imageFolder . "/" . $request->file('image')->getClientOriginalName();
        }
        $product->save();
        return  response()->json(['message' => "Product Added sucessfully",  'success' => true], 200);
    }
}
