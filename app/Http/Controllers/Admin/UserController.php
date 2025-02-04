<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\OptionResource;
use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::with('roles');

        $users = $query->paginate(10);
        return Inertia::render('Admin/User/Index', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all();

        return Inertia::render('Admin/User/Create', [
            'roleOptions' => OptionResource::collection($roles)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'is_approved' => $request->is_approved
            ]);
            $user->assignRole($request->role_id);
            DB::commit();
            return redirect()->route('admin.users.index')->with('success', 'User berhasil dibuat');
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
    public function show(User $user)
    {
        return Inertia::render('Admin/User/Show', [
            'user' => ['data' => $user->load('roles')],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $roles = Role::all();
        return Inertia::render('Admin/User/Edit', [
            'user' => ['data' => $user->load('roles')],
            'roleOptions' => OptionResource::collection($roles)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        DB::beginTransaction();
        try {
            $user->name = $request->name;
            $user->email = $request->email;
            if ($request->password) $user->password = Hash::make($request->password);
            $user->is_approved = $request->is_approved;
            $user->save();
            $user->syncRoles($request->role_id);
            DB::commit();
            return redirect()->route('admin.users.index')->with('success', 'User berhasil diubah');
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
    public function destroy(string $id)
    {
        //
    }
}
