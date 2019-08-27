<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('producto/list','API\ControllerProduct@get_all');
// crear producto
Route::post('producto/create','API\ControllerProduct@create');
// Actualizar producto
Route::post('producto/update','API\ControllerProduct@update');
// Eliminar producto
Route::post('producto/delete','API\ControllerProduct@delete');
// Eliminar producto
Route::get('usuario/list','API\ControllerUsuario@get_all');
// crear producto
Route::post('usuario/create','API\ControllerUsuario@create');
// Actualizar producto
Route::post('usuario/update','API\ControllerUsuario@update');
// Eliminar producto
Route::post('usuario/delete','API\ControllerUsuario@delete');

Route::get('equipo/list','API\ControllerEquipo@get_all');
// crear producto
Route::post('equipo/create','API\ControllerEquipo@create');
// Actualizar producto
Route::post('equipo/update','API\ControllerEquipo@update');
// Eliminar producto
Route::post('equipo/delete','API\ControllerEquipo@delete');


Route::get('orden/list','API\ControllerOrden@get_all');
// crear producto
Route::post('orden/create','API\ControllerOrden@create');
// Actualizar producto
Route::post('orden/update','API\ControllerOrden@update');


// Actualizar status
Route::get('grafica/getGraficaStatus','API\ControllerGrafica@getGraficaStatus');

// grafica servicio
Route::get('grafica/getGraficaServicio','API\ControllerGrafica@getGraficaServicio');
