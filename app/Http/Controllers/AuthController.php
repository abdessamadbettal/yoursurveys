<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email|string|exists:users,email',
            'password' => [
                'required',
            ],
            'remember' => 'boolean' // optional and this means it can be null or boolean value true or false only
        ]);
        $remember = $credentials['remember'] ?? false; // default to false if not set in request
        unset($credentials['remember']); // remove remember from credentials array

        if (!Auth::attempt($credentials, $remember)) { // attempt to login with credentials that means email and password
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout()
    {
        /** @var User $user */
        $user = Auth::user();
        // Revoke the token that was used to authenticate the current request...
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }

    // register
    public function register(AuthRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        // $token = $user->createToken('main')->plainTextToken;
        $token = $user->createToken('main')->plainTextToken;
        return response()->json(
            [
                'message' => 'Successfully registered',
                'user' => $user,
                'token' => $token,
            ], 201 );

    }
}
