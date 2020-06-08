<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Players extends Model
{
    public function results(){
        return $this->hasMany(Results::class, 'iFK_UserId');
    }
}
