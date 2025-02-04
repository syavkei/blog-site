<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    protected $fillable = [
        'title',
        'image',
        'is_active',
        'order'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];
}
