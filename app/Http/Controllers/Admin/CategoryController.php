<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Category::query();

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $categories = $query->paginate(10);

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        DB::beginTransaction();
        try {
            Category::create([
                'name' => $request->name
            ]);
            DB::commit();
            return redirect()->route('admin.categories.index')->with('success', 'Category created successfully.');
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
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return Inertia::render('Admin/Categories/Show', [
            'category' => $category
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        DB::beginTransaction();
        try {
            $category->update([
                'name' => $request->name,
                'slug' => str()->slug($request->name)
            ]);
            DB::commit();
            return redirect()->route('admin.categories.index')->with('success', 'Category updated successfully.');
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
    public function destroy(Category $category)
    {
        DB::beginTransaction();
        try {
            $category->delete();
            DB::commit();
            return redirect()->route('admin.categories.index')->with('success', 'Category deleted successfully.');
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
