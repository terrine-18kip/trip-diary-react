<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spot extends Model
{
    protected $guarded = [
        'id',
        'created_at',
        'updated_at'
    ];

    public function spot()
    {
        return $this->belongsTo(Spot::class);
    }
}
