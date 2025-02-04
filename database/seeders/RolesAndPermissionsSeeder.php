<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create_permissions for posts
        Permission::create(['name' => 'view_posts']);
        Permission::create(['name' => 'create_posts']);
        Permission::create(['name' => 'edit_posts']);
        Permission::create(['name' => 'delete_posts']);

        // Create_permissions for categories
        Permission::create(['name' => 'view_categories']);
        Permission::create(['name' => 'create_categories']);
        Permission::create(['name' => 'edit_categories']);
        Permission::create(['name' => 'delete_categories']);

        // Create_permissions for sliders
        Permission::create(['name' => 'view_sliders']);
        Permission::create(['name' => 'create_sliders']);
        Permission::create(['name' => 'edit_sliders']);
        Permission::create(['name' => 'delete_sliders']);

        // Create_permissions for users
        Permission::create(['name' => 'view_users']);
        Permission::create(['name' => 'create_users']);
        Permission::create(['name' => 'edit_users']);
        Permission::create(['name' => 'delete_users']);

        // Create_permissions for roles
        Permission::create(['name' => 'view_roles']);
        Permission::create(['name' => 'create_roles']);
        Permission::create(['name' => 'edit_roles']);
        Permission::create(['name' => 'delete_roles']);

        // Create_roles and assign permissions
        $role = Role::create(['name' => 'super-admin']);
        $role->givePermissionTo(Permission::all());

        $role = Role::create(['name' => 'writer']);
        $role->givePermissionTo([
            'view_posts',
            'create_posts',
            'edit_posts',
            'view_categories'
        ]);
    }
}
