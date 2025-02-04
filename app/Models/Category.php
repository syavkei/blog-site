<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Category extends Model
{
    protected $fillable = ['name', 'slug', 'image'];

    protected $appends = ['post_count', 'image_path'];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function getPostCountAttribute()
    {
        return $this->posts()->count();
    }

    public function getImagePathAttribute()
    {
        return $this->image ? Storage::url($this->image) : null;
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
