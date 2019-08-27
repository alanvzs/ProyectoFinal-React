<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/producto', function () {
    //llamar la vista 
    return view('producto');
});

Route::get('/usuario', function () {
    //llamar la vista 
    return view('usuario');
});
Route::get('/equipo', function () {
    //llamar la vista 
    return view('equipo');
});

Route::get('/orden', function () {
    //llamar la vista 
    return view('orden');
});

Route::get('/grafica', function () {
    //llamar la vista 
    return view('grafica');
});