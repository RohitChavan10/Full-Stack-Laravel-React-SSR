<?php

namespace App\Http\Controllers;

use App\Enum\RolesEnum;
use App\Http\Resources\AuthUserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('User/Index',[
            'users'=>AuthUserResource::collection(User::all())->collection->toArray(),
        ]);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('User/Edit',[
            'user'=>new AuthUserResource($user),
            'roles'=>Role::all(),
            'roleLabels' => RolesEnum::labels(),
            // 'userRoles' => $user->roles->pluck('name'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
    $data = $request->validate([
        'roles' => ['required', 'array'],
        'roles.*' => ['string', 'exists:roles,name'],
    ]);

    $user->syncRoles($data['roles']);

    return back ()->with('success','Roles updated succesfully');
    
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
