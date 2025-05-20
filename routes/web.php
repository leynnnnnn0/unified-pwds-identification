<?php

use App\Http\Controllers\AdminApplicationController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\Api\ApiKeyController;
use App\Http\Controllers\Api\BillingController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\IDVerification;
use App\Http\Controllers\Api\LandingPageController as APILandingPage;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PWDAccountController;
use App\Http\Controllers\PWDDashboardController;
use App\Http\Controllers\PWDProfileController;
use App\Http\Controllers\PWDRegistrationController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\DashboardController as ApiDashboardController;
use App\Http\Controllers\Api\UsageController;
use App\Http\Controllers\CardPrintingController;

Route::resource('', LandingPageController::class);

Route::get('api/documentation', [APILandingPage::class, 'show']);


Route::get('/api', [APILandingPage::class, 'index'])->name('landing-page');

Route::middleware('auth')->group(function () {

    Route::middleware('role:api-user')->group(function () {
        Route::prefix('api/billing')->group(function () {
            Route::get('/', [App\Http\Controllers\Api\BillingController::class, 'index'])->name('billing.index');
            Route::get('/checkout', CheckoutController::class)->name('billing.checkout');
            Route::put('/billing/cancel-subscription/{plan}', [BillingController::class, 'cancelSubscription'])->name('billing.cancel-subscription');
            Route::put('/billing/renew-subscription/{plan}', [BillingController::class, 'renewSubscription'])->name('billing.renew-subscription');
        });


        Route::prefix('api')->group(function () {

            Route::get('/dashboard', [ApiDashboardController::class, 'index'])->name('api.dashboard');
            Route::get('/api-keys', [ApiKeyController::class, 'index'])->name('api-keys');
            Route::post('/api-keys/store', [ApiKeyController::class, 'store'])->name('api-keys.store');
            Route::delete('/api-keys/delete/{id}', [ApiKeyController::class, 'destroy'])->name('api-keys.destroy');
            Route::get('/usage', [UsageController::class, 'index'])->name('api.usage');
        });
    });


    Route::prefix('admin')->middleware('role:admin')->name('admin.')->group(function () {
        Route::resource('dashboard', AdminDashboardController::class);
        Route::resource('applications', AdminApplicationController::class);
        Route::resource('verification', IDVerification::class);
        Route::resource('users', UserController::class);
        Route::resource('my-account', PWDAccountController::class);
        Route::resource('card-printing', CardPrintingController::class);

        Route::controller(AdminApplicationController::class)->name('applications.')->group(function () {
            Route::get('applications/{id}/process', 'process')->name('process');
            Route::get('applications/{id}', 'show')->name('applications.show');
            Route::post('applications/{id}/store-identification-card', 'storeIdentificationCard')->name('store-identification-card');
            Route::put('applications/{id}/update-document-details', 'updateDocumentDetails')->name('update-document-details');
            Route::put('applications/{id}/update-application-status', 'updateApplicationStatus')->name('update-application-status');

            Route::get('/api/municipalities/{province}', [UserController::class, 'getMunicipalities']);
        });
    });

    // How can i add a middleware so only user with role of 'user' can access this pages
    Route::middleware(['role:user'])->group(function () {
        Route::resource('my-account', PWDAccountController::class);
        Route::get('/dashboard', [PWDDashboardController::class, 'index'])->name('dashboard');
        Route::resource('my-profile', PWDProfileController::class);
        Route::post('/registration/update-form/{id}', [PWDRegistrationController::class, 'update'])->name('registration.update-form');
        Route::resource('registration', PWDRegistrationController::class);
        Route::put('/my-account/{id}/update-password', [PWDAccountController::class, 'updatePassword'])->name('my-account.update-password');
    });
});

Route::get('/api/municipalities/{province}', [UserController::class, 'getMunicipalities']);
Route::controller(LocationController::class)->group(function () {
    Route::get('/api/municipalities', 'getMunicipalities');
    Route::get('/api/regions', 'getRegions');
    Route::get('/api/barangays', 'getBarangays');
    Route::get('/api/provinces', 'getProvinces');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
