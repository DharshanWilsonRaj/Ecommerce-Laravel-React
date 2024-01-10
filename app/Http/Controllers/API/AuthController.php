<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'address' => 'required|string',
            'phone' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors(), 'success' => false], 400);
        }

        $user = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'address' => $request->input('address'),
            'phone' => $request->input('phone'),
            'role_id' => 2,
        ]);
        $user->save();
        return response()->json(['data' => "Register SuccessFully",  'success' => true], 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('permission_token')->accessToken;
            return response()->json(['success' => true, 'token' => $token, 'role_id' => $user->role_id], 200);
        } else {
            return response()->json(['success' => false, 'error' => 'Invalid credentials'], 401);
        }
    }

    public function logout()
    {
        if (Auth::guard('api')->check()) {
            Auth::guard('api')->user()->token()->revoke(); // Revoke the access token
            return response()->json(['success' => true, 'message' => 'Successfully logged out'], 200);
        }
        return response()->json(['success' => false, 'message' => 'Unauthenticated'], 401);
    }
}
