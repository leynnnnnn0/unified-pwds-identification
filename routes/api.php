<?php

use App\Http\Controllers\PWDIdentificationCardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::apiResource('pwd-identification-cards', PWDIdentificationCardController::class);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
