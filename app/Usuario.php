<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    //
    protected $table='usuario';

    protected $fillable=['id_usuario','nombre', 'departamento', 'area', 'cargo', 'telefono', 'email' ];

    // guardar sin created_at u updated_at
    public $timestamps = false;

}