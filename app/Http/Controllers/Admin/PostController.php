<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\OptionResource;
use App\Models\Category;
use App\Models\Post;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Post::with(['category', 'user']);

        if ($request->user()->roles[0]->name != 'super-admin') {
            $query->where('user_id', $request->user()->id);
        }

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $posts = $query->paginate(10);

        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();

        return Inertia::render('Admin/Posts/Create', [
            'categoryOptions' => OptionResource::collection($categories)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        DB::beginTransaction();

        $imagePath = null;
        try {

            if ($request->file('image')) {
                $slug = Str::slug($request->input('title'));
                $timestamp = now()->format('Ymd');
                $extension = $request->file('image')->getClientOriginalExtension();

                $fileName = "{$slug}-{$timestamp}.{$extension}";
                $path = 'post-header/' . date('Y/m/d');

                $imagePath = $request->file('image')->storeAs($path, $fileName, 'public');
            }

            $excerpt = Str::limit(strip_tags($request->content), 150);

            $post = Post::create([
                'title' => $request->title,
                'content' => $request->content,
                'excerpt' => $excerpt,
                'category_id' => $request->category_id,
                'image' => $imagePath,
                'user_id' => auth()->user()->id
            ]);

            DB::commit();

            return redirect()->route('admin.posts.index')->with('success', 'Post created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();

            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }

            if (app()->environment() === 'production') {
                Log::error($e->getMessage());
                return redirect()->back()->with('error', 'An error occurred. Please try again later.');
            } else {
                return redirect()->back()->with('error', $e->getMessage());
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $categories = Category::all();

        return Inertia::render('Admin/Posts/Show', [
            'categoryOptions' => OptionResource::collection($categories),
            'post' => $post
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $categories = Category::all();
        $post->load(['category', 'user']);

        return Inertia::render('Admin/Posts/Edit', [
            'categoryOptions' => OptionResource::collection($categories),
            'postData' => $post
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        DB::beginTransaction();

        $slug = Str::slug($request->input('title') . ' ' . now()->format('Ymd'));
        $excerpt = Str::limit(strip_tags($request->content), 150);

        try {
            $post->update([
                'title' => $request->title,
                'slug' => $slug,
                'content' => $request->content,
                'excerpt' => $excerpt,
                'category_id' => $request->category_id,
            ]);

            if ($request->file('image')) {

                $extension = $request->file('image')->getClientOriginalExtension();

                $fileName = "{$slug}.{$extension}";
                $path = 'post-header/' . date('Y/m/d');

                $imagePath = $request->file('image')->storeAs($path, $fileName, 'public');

                $post->update([
                    'image' => $imagePath
                ]);
            }

            DB::commit();
            return redirect()->route('admin.posts.index')->with('success', 'Post updated successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            if (app()->environment() === 'production') {
                Log::error($e->getMessage());
                return redirect()->back()->with('error', 'An error occurred. Please try again later.');
            } else {
                return redirect()->back()->with('error', $e->getMessage());
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        DB::beginTransaction();
        try {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $post->delete();
            DB::commit();
            return redirect()->route('admin.posts.index')->with('success', 'Post deleted successfully.');
        } catch (Exception $e) {
            DB::rollback();
            if (app()->environment() === 'production') {
                Log::error($e->getMessage());
                return redirect()->back()->with('error', 'An error occurred. Please try again later.');
            } else {
                return redirect()->back()->with('error', $e->getMessage());
            }
        }
    }
}
