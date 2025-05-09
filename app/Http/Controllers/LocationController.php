<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Rootscratch\PSGC\PSGC;

use function Pest\Laravel\json;

class LocationController extends Controller
{
    public function getMunicipalities()
    {
        $id = request('id');
        $psgcApi = new PSGC();
        return response()->json([
            'municipalities' => collect($psgcApi
                ->MunicipalAndCities($id))
                ->pluck('name', 'psgc_id')
        ]);
    }

    public function getRegions()
    {
        $id = request('id');
        $psgcApi = new PSGC();
        return response()->json([
            'regions' => collect($psgcApi
                ->Regions($id))
                ->pluck('name', 'psgc_id')
        ]);
    }

    public function getProvinces()
    {
        $id = request('id');
        $psgcApi = new PSGC();
        return response()->json([
            'provinces' => collect($psgcApi
                ->Provinces($id))
                ->pluck('name', 'psgc_id')
        ]);
    }

    public function getBarangays()
    {
        $id = request('id');
        $psgcApi = new PSGC();
        return response()->json([
            'barangays' => collect($psgcApi
                ->Barangays($id))
                ->pluck('name', 'psgc_id')
        ]);
    }
}
