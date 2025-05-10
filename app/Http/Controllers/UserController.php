<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
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
        $user->load(["municipalities", "provinces"]);

        return Inertia::render('User/Show', [
            'user' => $user,
        ]);
    }

    // No annual fee
    // 9710
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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required'],
            'middle_name' => ['nullable'],
            'last_name' => ['required'],
            'phone_number' => ['required'],
            'email' => ['required', 'unique:users,email'],
            'role' => ['required'],
            'remarks' => ['nullable'],
            'assignedProvinces' => [
                'nullable',
                'array',
                Rule::requiredIf(function () use ($request) {
                    return $request->role === 'sub_admin';
                }),
            ],
            'assignedMunicipalities' => [
                'nullable',
                'array',
                Rule::requiredIf(function () use ($request) {
                    return $request->role === 'processer';
                }),
            ],
        ]);

        $validated['username'] = $validated['first_name'];
        $validated['password'] = Hash::make('password');

        DB::beginTransaction();
        $user = User::create(Arr::except($validated, ['assignedProvinces', 'assignedMunicipalities']));

        if ($user->role == 'sub_admin') {
            foreach ($validated['assignedProvinces'] as $province) {
                $user->provinces()->create([
                    'province' => $province
                ]);
            }
        }
        if ($user->role == 'processer') {
            foreach ($validated['assignedMunicipalities'] as $municipality) {
                $user->municipalities()->create([
                    'municipality' => $municipality
                ]);
            }
        }
        DB::commit();

        return to_route('admin.users.index');
    }
}
