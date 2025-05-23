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
        $users = User::when(request('search'), function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->whereAny(['user', 'first_name', 'middle_name', 'last_name'], 'like', "%{$search}%");
            });
        })
            ->latest()
            ->paginate(10);
        return Inertia::render('User/Index', [
            'users' => $users,
            'filters' => request()->only(['search']),
        ]);
    }

    public function show(User $user)
    {

        $user->load(["municipalities", "provinces"]);

        $psgc = new PSGC();
        $provinces = [];
        $municipalities = [];

        if ($user->role == 'sub_admin') {
            $index = 0;
            foreach ($user->provinces->pluck('province') as $province) {
                $selections = collect($psgc->Provinces($province));
                $provinces[$index] = $selections->where('psgc_id', $province)->first()->name;
                $index++;
            }
        }

        if ($user->role == 'proccesser') {
            $index = 0;
            foreach ($user->municipalities->pluck('municipality') as $muncipality) {
                $selections = collect($psgc->MunicipalAndCities($muncipality));
                $municipalities[$index] = $selections->where('psgc_id', $muncipality)->first()->name;
                $index++;
            }
        }

        return Inertia::render('User/Show', [
            'user' => $user,
            'provinces' => implode(', ', $provinces),
            'municipalities' => implode(', ', $municipalities),

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
        $user->load(["municipalities", "provinces"]);

        $psgcApi = new PSGC();
        $provinces = collect($psgcApi->Provinces())->pluck('name', 'psgc_id');

        $municipalities = [];
        if ($user->role === 'processer' && $user->municipalities->isNotEmpty()) {
            $firstMunicipality = $user->municipalities->first()->municipality;
            $municipalities = collect($psgcApi->MunicipalAndCities($firstMunicipality))
                ->pluck('name', 'psgc_id');
        }

        return Inertia::render('User/Edit', [
            'user' => $user,
            'provinces' => $provinces,
            'municipalities' => $municipalities,
            'auth' => [
                'role' => auth()->user()->role
            ]
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

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'first_name' => ['required'],
            'middle_name' => ['nullable'],
            'last_name' => ['required'],
            'phone_number' => ['required'],
            'email' => ['required', Rule::unique('users')->ignore($user->id)],
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

        DB::beginTransaction();

        try {
            $user->update(Arr::except($validated, ['assignedProvinces', 'assignedMunicipalities']));

            // Sync provinces for sub_admin
            if ($user->role == 'sub_admin') {
                $user->provinces()->delete(); // Remove existing
                foreach ($validated['assignedProvinces'] as $province) {
                    $user->provinces()->create(['province' => $province]);
                }
            }

            // Sync municipalities for processer
            if ($user->role == 'processer') {
                $user->municipalities()->delete(); // Remove existing
                foreach ($validated['assignedMunicipalities'] as $municipality) {
                    $user->municipalities()->create(['municipality' => $municipality]);
                }
            }

            DB::commit();
            return to_route('admin.users.index');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to update user']);
        }
    }
}
