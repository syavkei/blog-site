<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $post_query = Post::with([
            'category:id,name,slug',
            'user:id,name'
        ]);

        $posts = $post_query->get();
        $populars = $post_query->orderBy('views', 'desc')->take(3)->get();

        $total_views = Post::sum('views');

        $contributors = User::role('writer')->with('roles')->get();

        return Inertia::render('Admin/Dashboard', [
            'posts' => $posts,
            'populars' => $populars,
            'contributors' => $contributors,
            'total_views' => $total_views
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
