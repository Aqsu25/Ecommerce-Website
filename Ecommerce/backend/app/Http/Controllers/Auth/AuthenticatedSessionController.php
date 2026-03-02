<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        try {
            $request->authenticate();
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Return proper JSON error instead of 405
            return response()->json([
                'status' => 401,
                'message' => 'Invalid credentials',
                'errors' => $e->errors()
            ], 401);
        }

        $user = $request->user();


        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'token_type' => 'Bearer',
            'status' => 200,
            'role' => $user->getRoleNames()->first(),
            'user' => $user
        ]);
    }


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        $request->user()->currentAccessToken()->delete();  // delete current token
        return response()->json(['message' => 'Logged out']);
    }
}
