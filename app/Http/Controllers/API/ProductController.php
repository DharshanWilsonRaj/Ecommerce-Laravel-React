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
        return response()->json(['success' => true, 'data' => $products,], 200);
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

    public function productEdit($id)
    {
        if (Auth::check()) {
            $user = Auth::user();
            if ($user->role_id != 1) {
                return response()->json(['message' => 'Unauthenticate request', 'success' => false], 200);
            }
            $product = Product::where('id', $id)->first();
            if ($product) {
                return response()->json(['success' => true, 'data' => $product]);
            } else {
                return response()->json(['success' => false, 'message' => "something went worng"]);
            }
        }
    }

    public function productUpate(Request $request, $id)
    {

        if (Auth::check()) {
            $user = Auth::user();
            if ($user->role_id != 1) {
                return response()->json(['message' => 'Unauthenticate request', 'success' => false], 400);
            }
        }
        $product = Product::where('id', $id)->firstOrFail();
        $imageDir = $product->image;

        if ($product) {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'required|string|max:255',
                'price' => 'required|numeric',
                'stocks' => 'required|numeric',
                'image' => 'required|max:2048'
            ]);

            if ($validator->fails()) {
                return response()->json(['message' => $validator->errors(), 'success' => false], 400);
            }

            if (empty($request->image)) {
                return response()->json(['message' => [
                    'image' => "Image field is required"
                ], 'success' => false], 400);
            }
            if ($request->hasFile('image')) {
                $imageFolder = 'product_images';

                // is there is any file exist first remove that
                if (!empty($imageDir) && file_exists(public_path($imageDir))) {
                    unlink(public_path($imageDir));
                }

                $request->file('image')->move(public_path($imageFolder), $request->file('image')->getClientOriginalName());
                $imageDir = "/" . $imageFolder . "/" . $request->file('image')->getClientOriginalName();
            }
            $product->update([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'stocks' => $request->stocks,
                'image' => $imageDir,
            ]);
            return response()->json(['success' => true, 'message' => "Product Updated Successfully"], 200);
        } else {
            return response()->json(['success' => false, 'message' => "something went worng"], 400);
        }
    }

    public function productDelete($id)
    {
        if (Auth::check()) {
            $user = Auth::user();
            if ($user->role_id != 1) {
                return response()->json(['message' => 'Unauthenticate request', 'success' => false], 400);
            }
        }
        $product = Product::where('id', $id)->firstOrFail();
        if (empty($product)) {
            return response()->json(['success' => false, 'message' => "Product not found"], 400);
        } else {
            $product->delete();
            return response()->json(['success' => true, 'message' => "Product deleted sucessfully"], 200);
        }
    }
}
