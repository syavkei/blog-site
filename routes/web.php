<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [\App\Http\Controllers\HomepageController::class, 'index'])->name('homepage');
Route::get('/post/{slug}', [\App\Http\Controllers\HomepageController::class, 'post'])->name('post.show');
Route::get('/category/{slug}', [\App\Http\Controllers\HomepageController::class, 'category'])->name('category.show');
Route::get('/about', [\App\Http\Controllers\HomepageController::class, 'about'])->name('about');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('sliders', \App\Http\Controllers\Admin\SliderController::class)->names('sliders');
    Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class)->names('categories');
    Route::resource('posts', \App\Http\Controllers\Admin\PostController::class)->names('posts');

    Route::post('image-upload', [\App\Http\Controllers\Admin\ImageUploadController::class, 'image_upload'])->name('image-upload');
});

require __DIR__ . '/auth.php';
