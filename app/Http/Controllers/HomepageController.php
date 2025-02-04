<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function index()
    {
        $categories = Category::select('id', 'name', 'slug')->get();
        $post_query = Post::with([
            'category:id,name,slug',
            'user:id,name'
        ]);
        $posts = $post_query->get();
        $latest = $post_query->orderBy('created_at', 'desc')->take(3)->get();
        return Inertia::render('Homepage/Index', [
            'categories' => $categories,
            'posts' => $posts,
            'latest' => $latest
        ]);
    }

    public function post(String $slug)
    {
        $categories = Category::select('id', 'name', 'slug')->get();
        $post = Post::with([
            'category:id,name,slug',
            'user:id,name'
        ])->where('slug', $slug)->firstOrFail();
        $post->increment('views');
        return Inertia::render('Homepage/Post', [
            'post' => $post,
            'categories' => $categories
        ]);
    }

    public function category(String $slug)
    {
        $categories = Category::select('id', 'name', 'slug')->get();
        $category = Category::with(['posts.category', 'posts.user'])->where('slug', $slug)->firstOrFail();
        return Inertia::render('Homepage/Category', [
            'category' => $category,
            'categories' => $categories
        ]);
    }

    public function about(Request $request)
    {
        $contributors = User::role('writer')->with('roles')->get();
        $posts = Post::select('id', 'title', 'slug')->get();
        $categories = Category::select('id', 'name', 'slug')->get();
        return Inertia::render('Homepage/About', [
            'categories' => $categories,
            'contributors' => $contributors,
            'posts' => $posts
        ]);
    }
}
