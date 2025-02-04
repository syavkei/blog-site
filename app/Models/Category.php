<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'slug'];

    protected $appends = ['post_count'];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function getPostCountAttribute()
    {
        return $this->posts()->count();
    }

    // Auto-generate slug from name
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($category) {
            $category->slug = str()->slug($category->name);
        });
    }
}
