<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    protected $guarded = [
        'id',
        'created_at',
        'updated_at'
    ];

    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }
}
