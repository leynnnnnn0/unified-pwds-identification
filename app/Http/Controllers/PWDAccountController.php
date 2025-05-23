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
            'username' => 'required|string|max:100|regex:/^[a-zA-Z\s]+$/',
            'first_name' => 'required|string|max:100|regex:/^[a-zA-Z\s]+$/',
            'middle_name' => 'nullable|string|max:100|regex:/^[a-zA-Z\s]+$/',
            'last_name' => 'required|string|max:100|regex:/^[a-zA-Z\s]+$/',
            'email' => ['required', 'email', "unique:users,email,$id"],
            'phone_number' => 'required|string|size:11|regex:/^09\d{9}$/',
        ], [
            'phone_number.required' => 'Mobile number is required.',
            'phone_number.size' => 'Mobile number must be exactly 11 digits long.',
            'phone_number.regex' => 'Mobile number must start with 09 and be followed by 9 additional digits.',
            'first_name.required' => 'First name is required.',
            'first_name.regex' => 'First name must contain only letters and spaces.',
            'middle_name.regex' => 'Middle name must contain only letters and spaces.',
            'last_name.required' => 'Last name is required.',
            'last_name.regex' => 'Last name must contain only letters and spaces.',
            'suffix.regex' => 'Suffix must contain only letters, spaces, and periods.',
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
