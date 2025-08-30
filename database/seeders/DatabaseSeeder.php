<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\Feature;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create roles
        $userRole = Role::firstOrCreate(['name' => RolesEnum::User->value]);
        $commenterRole = Role::firstOrCreate(['name' => RolesEnum::Commenter->value]);
        $adminRole = Role::firstOrCreate(['name' => RolesEnum::Admin->value]);

        // Create permissions
        $manageFeatures = Permission::firstOrCreate(['name' => PermissionsEnum::ManageFeatures->value]);
        $manageComments = Permission::firstOrCreate(['name' => PermissionsEnum::ManageComments->value]);
        $manageUsers    = Permission::firstOrCreate(['name' => PermissionsEnum::ManageUsers->value]);
        $upvoteDownvote = Permission::firstOrCreate(['name' => PermissionsEnum::UpvoteDownvotes->value]);

        // Assign permissions to roles
        $userRole->syncPermissions([$upvoteDownvote]);

        $commenterRole->syncPermissions([
            $upvoteDownvote,
            $manageComments,
        ]);

        $adminRole->syncPermissions([
            $upvoteDownvote,
            $manageUsers,
            $manageComments,
            $manageFeatures,
        ]);

        // Create users and assign roles
        User::firstOrCreate(
            ['email' => 'user@example.com'],
            ['name' => 'User', 'password' => bcrypt('password')]
        )->assignRole($userRole);

        User::firstOrCreate(
            ['email' => 'commenter@example.com'],
            ['name' => 'Commenter', 'password' => bcrypt('password')]
        )->assignRole($commenterRole);

        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            ['name' => 'Admin', 'password' => bcrypt('password')]
        )->assignRole($adminRole);

        // Seed some features
        Feature::factory(100)->create();
    }
}
