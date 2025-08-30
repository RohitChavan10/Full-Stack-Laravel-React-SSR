import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {  User } from "@/types";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { FormEventHandler } from "react";

import PrimaryButton from "@/Components/PrimaryButton";
import Checkbox from '@/Components/Checkbox';
import Radio from '@/Components/Radio';

export default function Show({roles, user, roleLabels}: {roles: any[], user: User, roleLabels: Record<string, string>}
) {
  const {
    data,
    setData,
    processing,
    errors,
    put
  } = useForm({
    name: user.name,
    email: user.email,
    roles: user.roles
  })

  const updateFeature: FormEventHandler = (ev) => {
    ev.preventDefault();

    put(route('user.update', user.id), {
      preserveScroll: true
    })
  }

  const onRoleChange =(ev:any) =>{
console.log(ev.target.value)
if(ev.target.checked){
  setData('roles',[ev.target.value])
}
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit User <b>"{user.name}"</b>
        </h2>
      }
    >
      <Head title={'Edit User ' + user.name} />

      <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
        <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
          <form onSubmit={updateFeature} className="w-full">
            <div className="mb-8">
              <InputLabel htmlFor="name" value="Name" />

              <TextInput
                id="name"
                disabled
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
                isFocused
                autoComplete="name"
              />
              <TextInput
                id="email"
                disabled
                className="mt-1 block w-full"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
                isFocused
              />
              <TextInput
                id="name"
                disabled
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
                isFocused
                autoComplete="name"
              />

              <InputError className="mt-2" message={errors.name} />

            </div>
            <h3 className="font-bold">Role</h3>
            <div className='mb-8'>
              {roles.map((role:any) =>(
                <div key={role.id}>
                  <Radio
                    name="roles"
                    checked={data.roles.includes(role.name)}  
                    value={role.name}
                    onChange={onRoleChange}
                  />
                  <span className='ms-2 text-sm text-gray-600 dark:text-gray-400'>
                  {roleLabels[role.name]}
                  </span>
                </div>
              ))}
            </div>


            <div className="flex items-center gap-4">
              <PrimaryButton disabled={processing}>Save</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}