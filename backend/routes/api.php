<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\SpotController;
use App\Http\Controllers\PlaceController;

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
Route::get('/trips/find/{uniqid}', [TripController::class, 'find']);

Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'me']);

Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::resource('trips', TripController::class, ['only' => ['index','store', 'show', 'update', 'destroy']]);
    Route::resource('plans', PlanController::class, ['only' => ['store', 'show', 'update', 'destroy']]);
    Route::resource('spots', SpotController::class, ['only' => ['store', 'update', 'destroy']]);
    Route::resource('spots', PlaceController::class, ['only' => ['store', 'update', 'destroy']]);
    Route::post('trips/add_member', [TripController::class, 'add_member']);
    Route::post('trips/remove_member', [TripController::class, 'remove_member']);
    Route::post('spots/order', [SpotController::class, 'order']);
    Route::post('user/update_name', [AuthController::class, 'update_name']);
    Route::post('user/update_email', [AuthController::class, 'update_email']);
    Route::post('user/update_password', [AuthController::class, 'update_password']);
});