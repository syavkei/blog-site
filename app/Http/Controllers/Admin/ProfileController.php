<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function edit(Request $request)
    {
        $user = $request->user();
        return Inertia::render('Admin/Profile/Edit', ['user' => $user]);
    }

    public function update(Request $request)
    {
        DB::beginTransaction();
        try {
            // validate
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255'],
                'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
                'password' => ['nullable', 'string', 'min:6', 'confirmed'],
                'password_confirmation' => ['nullable', 'required_with:password', 'string', 'min:6'],
            ]);

            $user = User::find($request->user()->id);
            $user->name = $request->name;
            $user->email = $request->email;
            if ($request->password) {
                $user->password = bcrypt($request->password);
            }
            if ($request->file('image')) {
                $imagePath = $request->file('image')->store('images', 'public');
                $user->image = $imagePath;
            }
            $user->save();

            if ($request->file('image')) {

                $extension = $request->file('image')->getClientOriginalExtension();

                $slug = str()->slug($request->name);

                $fileName = "{$slug}.{$extension}";
                $path = date('Y/m/d');

                $imagePath = $request->file('image')->storeAs($path, $fileName, 'public');

                $user->update([
                    'image' => $imagePath
                ]);
            }

            DB::commit();
            return redirect()->route('admin.dashboard')->with('success', 'Profile updated successfully.');
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
}
