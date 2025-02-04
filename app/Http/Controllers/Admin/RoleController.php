<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Resources\OptionResource;
use App\Models\Permission;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $query = Role::with(['permissions']);

        $roles = $query->paginate(10);
        return Inertia::render('Admin/Role/Index', [
            'roles' => $roles
        ]);
    }

    public function create()
    {
        $permissions = Permission::all();
        return Inertia::render('Admin/Role/Create', [
            'permissionOptions' => OptionResource::collection($permissions)
        ]);
    }

    public function store(StoreRoleRequest $request)
    {
        DB::beginTransaction();
        try {
            $role = new Role();
            $role->name = $request->name;
            $role->guard_name = "web";
            $role->save();

            foreach ($request->permissions as $permission) {
                $role->givePermissionTo($permission['label']);
            }
            DB::commit();
            return redirect()->route('admin.roles.index')->with('success', 'Role berhasil dibuat');
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
