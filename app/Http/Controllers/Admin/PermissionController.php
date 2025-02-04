<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function index(Request $request)
    {
        $query = Permission::query();

        $permissions = $query->paginate(10);
        return Inertia::render('Admin/Permission/Index', [
            'permissions' => $permissions
        ]);
    }

    public function create()
    {
        $permissions = Permission::all();
        return Inertia::render('Admin/Permission/Create');
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {

            $permission = Permission::create([
                'name' => str_replace(" ", "_", strtolower($request->name)),
                'guard_name' => 'web'
            ]);
            DB::commit();
            return redirect()->route('admin.permissions.index')->with('success', 'Permission berhasil dibuat');
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
