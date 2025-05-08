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

        $province = request('province') ?? null;
        $psgcApi = new PSGC();

        $municipalities =  collect($psgcApi->MunicipalAndCities($MunicipalAndCities_ID = $province))->pluck('name', 'psgc_id');

        $provinces = collect($psgcApi->Provinces($province_id = null))->pluck('name', 'psgc_id');

        return Inertia::render('User/Create', [
            'provinces' => $provinces,
            'municipalities' => $municipalities,
            'filters' => request()->only(['province'])
        ]);
    }
    public function edit(User $user)
    {
        return Inertia::render('User/Edit', [
            'user' => $user,
        ]);
    }

    public function getMunicipalities($province)
    {
        $psgcApi = new PSGC();
        return response()->json([
            'municipalities' => collect($psgcApi->MunicipalAndCities($province))->pluck('name', 'psgc_id')
        ]);
    }
}
