<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{
    public function image_upload(Request $request)
    {
        $request->validate([
            'image' => 'required|string',
        ]);

        $image = $request->input('image');
        $image = preg_replace('/^data:image\/\w+;base64,/', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = time() . '.png';

        Storage::disk('public')->put("post-content/" . date('Y/m/d') . "/{$imageName}", base64_decode($image));

        $url = asset("storage/post-content/" . date('Y/m/d') . "/{$imageName}");

        return response()->json(['url' => $url]);
    }
}
