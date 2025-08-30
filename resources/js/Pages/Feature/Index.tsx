import FeatureItem from '@/Components/FeatureItem';
import { can } from '@/helpers';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Feature, PageProps, PaginatedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({auth,features}:PageProps<{features:PaginatedData<Feature>}>) {
    usePage().props.auth.user;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Features
                </h2>
            }
        >
            <Head title="Features" />

       {can(auth.user,'manage_features') && (
  <div className='mb-8'>
    <Link
      href={route('feature.create')}
      className='inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900'
    >
      Create New Feature
    </Link>
  </div>
)}


            {features.data.map(feature=>(
                    <FeatureItem feature={feature} key={feature.id}/>
                   ))} 
        </AuthenticatedLayout>
    );
}
