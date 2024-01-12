<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });



// Every can access routes:
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');

// Authentication Routes
Route::controller(AuthController::class)->group(function () {
    Route::post('logout', 'logout');
})->middleware('auth:api');


// Admin Routes
Route::middleware('auth:api')->group(function () {
    Route::get('/product-index', [ProductController::class, 'index'])->name('product-index');
    Route::post('/product-store', [ProductController::class, 'store'])->name('product-store');
    Route::get('/product/edit/{id}', [ProductController::class, 'productEdit'])->name('product-edit');
    Route::post('/product/update/{id}', [ProductController::class, 'productUpate'])->name('product-update');
    Route::post('/product/delete/{id}', [ProductController::class, 'productDelete'])->name('product-delete');
});
