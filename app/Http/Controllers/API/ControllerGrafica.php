<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
Use Log;

class ControllerGrafica extends Controller
{
    public function getGraficaStatus() {
      
      $graph = "select estado,count(*) cantidad from equipo
      GROUP BY estado;";
      $datos = DB::select($graph);
      
       return $datos;
  }

  public function getGraficaServicio() {
     
   $graph = "select tip_servicio,count(*) cantidad from orden
   GROUP BY tip_servicio;";
   $datos = DB::select($graph);
   
    return $datos;
    }

}