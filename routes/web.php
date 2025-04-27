<?php

use App\Http\Controllers\AdminApplicationController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\IDVerification;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PWDAccountController;
use App\Http\Controllers\PWDDashboardController;
use App\Http\Controllers\PWDProfileController;
use App\Http\Controllers\PWDRegistrationController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::resource('', LandingPageController::class);

Route::prefix('admin')->name('admin.')->group(function () {
    Route::resource('dashboard', AdminDashboardController::class);
    Route::resource('applications', AdminApplicationController::class);
    Route::resource('verification', IDVerification::class);
    Route::resource('users', UserController::class);

    Route::controller(AdminApplicationController::class)->name('applications.')->group(function () {
        Route::get('applications/{id}/process', 'process')->name('process');
        Route::get('applications/{id}', 'show')->name('applications.show');
        Route::post('applications/{id}/store-identification-card', 'storeIdentificationCard')->name('store-identification-card');
    });
});
Route::get('/dashboard', [PWDDashboardController::class, 'index'])->name('dashboard');
Route::resource('my-profile', PWDProfileController::class);
Route::resource('registration', PWDRegistrationController::class);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
