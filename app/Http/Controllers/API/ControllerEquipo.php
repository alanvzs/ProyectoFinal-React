<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Equipo;
Use Log;

class ControllerEquipo extends Controller
{
    //
    public function get_all(){
      return Equipo::all();
    }

    // funcion de insertar
    public function create(Request $request){

      // inserta los datos
      Equipo::insert([
        'no_inventario' => $request->input('no_inventario'),
        'marca' => $request->input('marca'),
        'modelo' => $request->input('modelo'),
        'procesador' => $request->input('procesador'),
        'ram' => $request->input('ram'),
        'hd' => $request->input('hd'),
        'estado' => $request->input('estado'),
        'sis_oper' => $request->input('sis_oper'),
        'ofimatica' => $request->input('ofimatica'),
        'antivirus' => $request->input('antivirus')
      ]);

      // respesta de JSON
      $response['message'] = "Guardo exitosamente";
      $response['success'] = true;

      return $response;
    }

    public function update(Request $request){

      // inserta los datos
      Equipo::where('id_equipo',$request->input('id_equipo'))->
      update([
        'no_inventario' => $request->input('no_inventario'),
        'marca' => $request->input('marca'),
        'modelo' => $request->input('modelo'),
        'procesador' => $request->input('procesador'),
        'ram' => $request->input('ram'),
        'hd' => $request->input('hd'),
        'estado' => $request->input('estado'),
        'sis_oper' => $request->input('sis_oper'),
        'ofimatica' => $request->input('ofimatica'),
        'antivirus' => $request->input('antivirus')
      ]);

      // respesta de JSON
      $response['message'] = "Actualizo exitosamente";
      $response['success'] = true;

      return $response;

    }

    public function delete(Request $request){

      // Eliminar
      Equipo::where('id_equipo',$request->input('id_equipo'))->delete();
      // respesta de JSON
      $response['message'] = "Elimino exitosamente";
      $response['success'] = true;

      return $response;
    }

}
