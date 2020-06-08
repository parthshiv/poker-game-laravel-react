<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Results extends Model
{
    public function players(){
        return $this->belongsTo(Results::class, 'iFK_UserId');
    }
}
