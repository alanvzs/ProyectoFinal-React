<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Usuario;
Use Log;

class ControllerUsuario extends Controller
{
    //
    public function get_all(){
      return Usuario::all();
    }

    // funcion de insertar
    public function create(Request $request){

      // inserta los datos
      Usuario::insert([
        'nombre' => $request->input('nombre'),
        'departamento' => $request->input('departamento'),
        'area' => $request->input('area'),
        'cargo' => $request->input('cargo'),
        'telefono' => $request->input('telefono'),
        'email' => $request->input('email')
      ]);

      // respesta de JSON
      $response['message'] = "Guardo exitosamente";
      $response['success'] = true;

      return $response;
    }

    public function update(Request $request){

      // inserta los datos
      Usuario::where('id_usuario',$request->input('id_usuario'))->
      update([
        'nombre' => $request->input('nombre'),
        'departamento' => $request->input('departamento'),
        'area' => $request->input('area'),
        'cargo' => $request->input('cargo'),
        'telefono' => $request->input('telefono'),
        'email' => $request->input('email')
      ]);

      // respesta de JSON
      $response['message'] = "Actualizo exitosamente";
      $response['success'] = true;

      return $response;

    }

    public function delete(Request $request){

      // Eliminar
      Usuario::where('id_usuario',$request->input('id_usuario'))->delete();
      // respesta de JSON
      $response['message'] = "Elimino exitosamente";
      $response['success'] = true;

      return $response;
    }

}
