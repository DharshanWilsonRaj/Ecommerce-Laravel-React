<?php

use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\RazorpayController;
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

    Route::controller(ProductController::class)->group(function () {
        Route::get('/product-index', 'index');
        Route::post('/product-store', 'store');
        Route::get('/product/edit/{id}', 'productEdit');
        Route::post('/product/update/{id}', 'productUpate');
        Route::post('/product/delete/{id}', 'productDelete');
    });

    Route::controller(AdminController::class)->group(function () {
        Route::get('/admin-profile', 'profileView');
        Route::post('/admin-profile/update', 'profileUpdate');
    });
});


// Customer_controller 
Route::controller(CustomerController::class)->group(function () {
    Route::get('/products-list', 'productList');
    Route::post('/addCart/{id}', 'addCart')->middleware('auth:api');
    Route::get('/viewCart', 'viewCart')->middleware('auth:api');
    Route::post('/updateCart/{type}/{id}', 'updateCart')->middleware('auth:api');
    Route::post('/remove-cart-item/{id}', 'removeCart')->middleware('auth:api');

    Route::get('/customer-profile', 'customerProfile')->middleware('auth.api');
});


Route::controller(RazorpayController::class)->group(function () {
    Route::post('/razorpay', 'razorpay')->middleware('auth:api');
});
