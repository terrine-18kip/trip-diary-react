<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    protected $guarded = [
        'id',
        'created_at',
        'updated_at'
    ];

    public function plans()
    {
        return $this->hasMany(Plan::class)->orderBy('daily', 'asc');
    }
}
