<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    //
    protected $table='equipo';

    protected $fillable=['id_equipo','no_inventario', 'marca', 'modelo', 'estado', 'sis_oper', 'ofimatica', 'antivirus'  ];

    // guardar sin created_at u updated_at
    public $timestamps = false;

}