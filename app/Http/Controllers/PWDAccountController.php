<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
            'first_name' => ['required'],
            'middle_name' => ['nullable'],
            'last_name' => ['required'],
            'email' => ['required', "unique:users,email,$id"],
            'phone_number' => ['required']
        ]);

        User::findOrFail($id)->update($validated);

        return back();
    }
}
