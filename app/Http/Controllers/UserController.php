<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Rootscratch\PSGC\PSGC;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(10);
        return Inertia::render('User/Index', [
            'users' => $users
        ]);
    }

    public function show(User $user)
    {


        return Inertia::render('User/Show', [
            'user' => $user,
        ]);
    }
    public function create()
    {
        // Mr Simple
        // https://github.com/jaycee0610/PSGC-API
        $psgcApi = new PSGC();
        $cAndM =  $psgcApi->MunicipalAndCities($MunicipalAndCities_ID = null);
        return Inertia::render('User/Create');
    }
    public function edit(User $user)
    {
        return Inertia::render('User/Edit', [
            'user' => $user,
        ]);
    }
}
