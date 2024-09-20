<?php

use App\Http\Controllers\HeroController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/hero', [HeroController::class, 'index']);
Route::post('/hero', [HeroController::class, 'store']);
Route::get('/hero/{id}', [HeroController::class, 'show']);
Route::put('/hero/{id}', [HeroController::class, 'update']);
Route::delete('/hero/{id}', [HeroController::class, 'destroy']);

