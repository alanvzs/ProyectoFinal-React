<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Orden extends Model
{
    // 
    protected $table='orden';

    protected $primaryKey = 'id_orden';

    protected $fillable=['id_equipo', 'id_usuario', 'tip_servicio', 'fecha_servicio', 'diagnostico', 'servicio_realizado', 'observaciones', 'tecnico' ];

    public $timestamps = false;


   
}