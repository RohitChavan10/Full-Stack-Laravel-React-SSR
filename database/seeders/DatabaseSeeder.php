<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\Feature;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
    $userRole = Role::firstOrCreate(['name' => RolesEnum::User->value]);
$commenterRole = Role::firstOrCreate(['name' => RolesEnum::Commenter->value]);
$adminRole = Role::firstOrCreate(['name' => RolesEnum::Admin->value]);

 $manageFeaturesPermission = Permission::firstOrCreate([
    'name' => PermissionsEnum::ManageFeatures->value,
]);

$manageCommentsPermission = Permission::firstOrCreate([
    'name' => PermissionsEnum::ManageComments->value,
]);

$manageUsersPermission = Permission::firstOrCreate([
    'name' => PermissionsEnum::ManageUsers->value,
]);

$upvoteDownvotePermission = Permission::firstOrCreate([
    'name' => PermissionsEnum::UpvoteDownvotes->value,
]);

     $userRole->syncPermissions([$upvoteDownvotePermission]);
     $commenterRole->syncPermissions([$upvoteDownvotePermission,$manageCommentsPermission]);
     $adminRole->syncPermissions([
        $upvoteDownvotePermission,
        $manageUsersPermission,
        $manageCommentsPermission,
        $manageFeaturesPermission,
     ]);



        User::factory()->create([
            'name' => 'User',
            'email' => 'user@example.com',
        ])->assignRole(RolesEnum::User);

                User::factory()->create([
            'name' => 'Commenter',
            'email' => 'commenter@example.com',
        ])->assignRole(RolesEnum::Commenter);

                User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
        ])->assignRole(RolesEnum::Admin);

        Feature::factory(100)->create();
    }


}
