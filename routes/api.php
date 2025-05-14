<?php

use App\Http\Controllers\Api\ApiRequestController;
use App\Http\Controllers\PWDIdentificationCardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/pwd-identification-cards/show', [PWDIdentificationCardController::class, 'show'])->name('pwd-identification-cards.show');

Route::get('/verification', [ApiRequestController::class, 'show']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
