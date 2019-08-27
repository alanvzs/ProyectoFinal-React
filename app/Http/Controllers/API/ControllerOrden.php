<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Orden;
use Illuminate\Support\Facades\DB;
Use Log;

class ControllerOrden extends Controller
{
    
    public function get_all()
    {
        $orden = DB::table('orden')->select('id_orden','equipo.id_equipo','no_inventario','usuario.id_usuario','nombre','tip_servicio','fecha_servicio','diagnostico','servicio_realizado','observaciones','tecnico')
        ->join('equipo',"equipo.id_equipo","=","orden.id_equipo")
        ->join('usuario',"usuario.id_usuario","=","orden.id_usuario")
        ->get();

      return $orden;
       
    }

    // funcion de insertar
    public function create(Request $request){

        Orden::insert([
          'id_equipo' => $request->input('equipo'),
          'id_usuario' => $request->input('usuario'),
          'tip_servicio' => $request->input('tipo'),
          'diagnostico' => $request->input('diagnostico'),
          'servicio_realizado' => $request->input('servicio'),
          'observaciones' => $request->input('observaciones'),
          'tecnico' => $request->input('tecnico')
        ]);
      
        $response['message'] = "Guardo exitosamente";
        $response['success'] = true;
       
        return $response;
    }

    public function update(Request $request){

        // inserta los datos
        Orden::where('id_orden',$request->input('id_orden'))->
        update([
          'id_equipo' => $request->input('equipo'),
          'id_usuario' => $request->input('usuario'),
          'tip_servicio' => $request->input('tipo'),
          'diagnostico' => $request->input('diagnostico'),
          'servicio_realizado' => $request->input('servicio'),
          'observaciones' => $request->input('observaciones'),
          'tecnico' => $request->input('tecnico')
        ]);
  
        // respesta de JSON
        $response['message'] = "Actualizo exitosamente";
        $response['success'] = true;
  
        return $response;
  
    }

    public function getGraficaStatus() {
      
       $graph = "select estado,count(*) n from equipo
       GROUP BY estado;";
       $datos = DB::select($graph);
       
        return $datos;
   }

   public function getGraficaServicio() {
      
    $graph = "select tip_servicio,count(*) n from orden
    GROUP BY tip_servicio;";
    $datos = DB::select($graph);
    
     return $datos;
  }

    
}
