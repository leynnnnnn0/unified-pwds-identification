<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules;

class PWDAccountController extends Controller
{
    public function index()
    {
        return Inertia::render('PWDAccount/Index', [
            'user' => Auth::user()
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'username' => ['required'],
            'first_name' => ['required'],
            'middle_name' => ['nullable'],
            'last_name' => ['required'],
            'email' => ['required', "unique:users,email,$id"],
            'phone_number' => ['required']
        ]);

        User::findOrFail($id)->update($validated);

        return back();
    }

    public function updatePassword(Request $request, $id)
    {
        $validated = $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()]
        ]);

        User::findOrFail($id)->update([
            'password' => Hash::make($validated['password'])
        ]);

        return back();
    }
}
