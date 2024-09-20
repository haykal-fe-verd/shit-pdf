<?php

use App\Http\Controllers\Web\AuthController;
use App\Http\Controllers\Web\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'login_index'])->name('login');
    Route::post('login', [AuthController::class, 'login_store']);

    Route::get('register', [AuthController::class, 'register_index'])->name('register');
    Route::post('register', [AuthController::class, 'register_store']);

    Route::get('forgot-password', [AuthController::class, 'forgot_password_index'])->name('password.request');
    Route::post('forgot-password', [AuthController::class, 'forgot_password_store'])->name('password.email');

    Route::get('reset-password/{token}', [AuthController::class, 'reset_password_index'])->name('password.reset');
    Route::post('reset-password', [AuthController::class, 'reset_password_store'])->name('password.store');
});

Route::middleware('auth')->group(function () {
    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->middleware('password.confirm')
        ->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    Route::put('password', [AuthController::class, 'update_password'])->name('password.update');

    Route::get('confirm-password', [AuthController::class, 'confirm_password_index'])->name('password.confirm');
    Route::post('confirm-password', [AuthController::class, 'confirm_password_store']);

    Route::get('verify-email', [AuthController::class, 'verify_email_index'])->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', [AuthController::class, 'verify_email_verify'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [AuthController::class, 'verify_email_store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');
});
