import CommentItem from '@/Components/CommentItem';
import FeatureItem from '@/Components/FeatureItem';
import FeatureUpvoteDownvote from '@/Components/FeatureUpvoteDownvote';
import NewCommentForm from '@/Components/NewCommentForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Feature, Comment, PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { can } from '@/helpers';

export default function Show({ auth, feature }: PageProps<{ feature: Feature }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Features <br /> {feature.name}
                </h2>
            }
        >
            <Head title={'Feature ' + feature.name} />

            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 flex gap-8">
                    <FeatureUpvoteDownvote feature={feature} />
                    <div className="flex-1">
                        <h2 className="text-2xl mb-2">{feature.name}</h2>
                        <p>{feature.description}</p>

                        {/* ✅ Only show Edit/Delete if user has permission */}
                        {can(auth.user, 'manage_features') && (
                            <div className="mt-4 flex gap-2">
                                <Link
                                    href={route('feature.edit', feature.id)}
                                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                                >
                                    Edit
                                </Link>
                                <Link
                                    as="button"
                                    method="delete"
                                    href={route('feature.destroy', feature.id)}
                                    className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                                >
                                    Delete
                                </Link>
                            </div>
                        )}

                        <div className="mt-8">
                            <NewCommentForm feature={feature} />
                            {feature.comments.map((comment: Comment) => (
                                <CommentItem comment={comment} key={comment.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
