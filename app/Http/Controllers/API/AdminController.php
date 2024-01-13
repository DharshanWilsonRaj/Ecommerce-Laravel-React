<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function profileView()
    {
        if (!empty(Auth::check())) {
            $user = Auth::user();
            
            return response()->json(['success' => true, 'data' => $user]);
        } else {
            return response()->json(['success' => false, 'message' => "Unauthenticate Action"], 400);
        }
    }

    public function profileUpdate(Request $request)
    {
        if (!empty(Auth::check())) {
            $user = Auth::user();

            if ($user->role_id != 1) {
                return response()->json(['success' => false, 'message' => "Unauthenticate Action"], 400);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            ]);

            if ($validator->fails()) {
                return response()->json(['message' => $validator->errors(), 'success' => false], 200);
            }

            $imageDir = $user->image;
            if ($request->hasFile('image')) {
                $imageFolder = 'profile_image';

                // is there is any file exist first remove that
                if (!empty($imageDir) && file_exists(public_path($imageDir))) {
                    unlink(public_path($imageDir));
                }

                if (!empty($request->file('image'))) {
                    $request->file('image')->move(public_path($imageFolder), $request->file('image')->getClientOriginalName());
                    $imageDir = "/" . $imageFolder . "/" . $request->file('image')->getClientOriginalName();
                }
            }

            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'image' => $imageDir,
            ]);

            return response()->json(['success' => true, 'message' => "Profile Updated Successfully"], 200);
        } else {
            return response()->json(['success' => false, 'message' => "Unauthenticate Action"], 400);
        }
    }
}
