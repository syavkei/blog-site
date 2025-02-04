<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'image',
        'category_id',
        'views',
        'user_id'
    ];

    protected $appends = ['image_path'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($post) {
            $post->slug = str()->slug($post->title . ' ' . now()->format('YmdHis'));
        });
    }

    public function getImagePathAttribute()
    {
        return $this->image ? Storage::url($this->image) : null;
    }
}
