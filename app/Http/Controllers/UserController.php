<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Index');
    }

    public function show(User $user)
    {
        return Inertia::render('User/Show', [
            'user' => $user,
        ]);
    }
    public function create()
    {
        return Inertia::render('User/Create');
    }
    public function edit(User $user)
    {
        return Inertia::render('User/Edit', [
            'user' => $user,
        ]);
    }
}
