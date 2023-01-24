<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Rules\Current;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Exception;

class AuthController extends Controller
{
    public function entry(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        return $user;
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return Auth::user();
        }

        throw new Exception('ログインに失敗しました');
    }

    public function logout(Request $request)
    {
        Auth::logout();
    }

    public function me(Request $request)
    {
        $user = $request->user();
        $user->trips;
        return $user;
    }

    public function update_name(Request $request)
    {
        $user = $request->user();
        $inputs['name'] = $request->name;
        $user->fill($inputs)->save();
        return $user;
    }

    public function update_email(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'email' => [
                'required', 
                'email', 
                Rule::unique('users')->ignore($user->id)
            ],
        ]);

        $inputs['email'] = $request->email;
        $user->fill($inputs)->save();
        return $user;
    }

    public function update_password(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'current_password' => new Current(),
            'password' => ['required', 'between:6,30', 'confirmed'],
        ]);

        $inputs['password'] = bcrypt($request->password);
        $user->fill($inputs)->save();
        return $user;
    }
}
