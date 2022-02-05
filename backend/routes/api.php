<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\SpotController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/entry', [AuthController::class, 'entry']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('trips', TripController::class, ['only' => ['index','store', 'show', 'update', 'destroy']]);
Route::resource('plans', PlanController::class, ['only' => ['store', 'show', 'update', 'destroy']]);
Route::resource('spots', SpotController::class, ['only' => ['store', 'update', 'destroy']]);