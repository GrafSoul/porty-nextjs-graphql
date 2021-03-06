// Core
import { useState, useRef } from 'react';
// Apollo
import { useQuery, useMutation } from '@apollo/client';
import useGetUser from '../../../apollo/actions/useGetUser';
import { TOPIC_BY_SLUG, POSTS_BY_TOPIC } from '@/apollo/queries';
import { CREATE_POST } from '@/apollo/mutation';
import { useRouter } from 'next/router';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
// Component
import PostItem from '@/components/forum/PostItem';
import BaseLayout from '@/layouts/BaseLayout';
import Replier from '@/components/helpers/Replier';
import AppPagination from '@/components/layout/Pagination';
// Toastify
import { toast } from 'react-toastify';

const useInitialData = (slug, pagination) => {
    const useGetTopicBySlug = (options) => useQuery(TOPIC_BY_SLUG, options);
    const useGetPostsByTopic = (options) => useQuery(POSTS_BY_TOPIC, options);
    const { data: dataT } = useGetTopicBySlug({ variables: { slug } });
    const { data: dataP, fetchMore } = useGetPostsByTopic({
        variables: { slug, ...pagination },
        pollInterval: 5000,
    });
    const { data: dataU } = useGetUser();
    const topic = (dataT && dataT.topicBySlug) || {};
    const postData = (dataP && dataP.postsByTopic) || { posts: [], count: 0 };
    const user = (dataU && dataU.user) || null;
    return { topic, ...postData, user, fetchMore };
};

const PostPage = () => {
    const router = useRouter();
    const { slug, pageNum = 1, pageSize = 5 } = router.query;
    const [pagination, setPagination] = useState({
        pageNum: parseInt(pageNum, 10),
        pageSize: parseInt(pageSize, 10),
    });
    const { topic, posts, ...rest } = useInitialData(slug, pagination);

    return (
        <BaseLayout>
            <div className="container">
                <section className="section-title">
                    <div className="px-2">
                        <div className="pt-5 pb-4">
                            <h1>{topic.title}</h1>
                        </div>
                    </div>
                </section>
                <Posts
                    posts={posts}
                    topic={topic}
                    {...rest}
                    {...pagination}
                    onPageChange={(pageNum, pageSize) => {
                        router.push(
                            '/forum/topics/[slug]',
                            `/forum/topics/${slug}?pageNum=${pageNum}&pageSize=${pageSize}`,
                            { shallow: true },
                        );
                        setPagination({ pageNum, pageSize });
                    }}
                />
            </div>
        </BaseLayout>
    );
};

const Posts = ({ posts, topic, user, fetchMore, ...pagination }) => {
    const pageEnd = useRef();

    const useCreatePost = () =>
        useMutation(CREATE_POST, {
            update(cache) {
                try {
                    Object.keys(cache.data.data).forEach((key) => {
                        key.match(/^Post/) && cache.data.delete(key);
                    });
                } catch (e) {}
            },
        });

    const [createPost, { error }] = useCreatePost();
    const [isReplierOpen, setReplierOpen] = useState(false);
    const [replyTo, setReplyTo] = useState(null);
    const { pageSize, count, pageNum } = pagination;

    const handleCreatePost = async (reply, resetReplier) => {
        if (replyTo) {
            reply.parent = replyTo._id;
        }

        reply.topic = topic._id;

        await createPost({ variables: reply });

        let lastPage = Math.ceil(count / pageSize);
        if (count === 0) {
            lastPage = 1;
        }

        lastPage === pageNum &&
            (await fetchMore({
                variables: { pageSize, pageNum: lastPage },
                updateQuery: (previousResults, { fetchMoreResult }) => {
                    return Object.assign({}, previousResults, {
                        postsByTopic: { ...fetchMoreResult.postsByTopic },
                    });
                },
            }));
        resetReplier();
        cleanup();
    };

    const cleanup = () => {
        setReplierOpen(false);
        toast.success('Post has been created!', { autoClose: 2000 });
        scrollToBottom();
    };

    const scrollToBottom = () =>
        pageEnd.current.scrollIntoView({ behavior: 'smooth' });

    return (
        <section className="mb-5">
            <div className="fj-post-list">
                {topic._id && pagination.pageNum === 1 && (
                    <PostItem post={topic} className="topic-post-lead" />
                )}
                {posts.map((post) => (
                    <div key={post._id} className="row">
                        <div className="col-md-9">
                            <PostItem
                                post={post}
                                canCreate={user !== null}
                                onReply={(reply) => {
                                    setReplyTo(reply);
                                    setReplierOpen(true);
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="row mt-2 mx-0">
                <div className="col-md-9">
                    <div className="posts-bottom">
                        {user && (
                            <div className="pt-2 pb-2">
                                <button
                                    onClick={() => {
                                        setReplyTo(null);
                                        setReplierOpen(true);
                                    }}
                                    className="btn btn-lg btn-outline-primary"
                                >
                                    Create New Post
                                </button>
                            </div>
                        )}
                        <div className="pagination-container ml-auto">
                            <AppPagination {...pagination} />
                        </div>
                    </div>
                </div>
            </div>
            <div ref={pageEnd}></div>
            <Replier
                isOpen={isReplierOpen}
                hasTitle={false}
                onSubmit={handleCreatePost}
                replyTo={(replyTo && replyTo.user.username) || topic.title}
                onClose={() => setReplierOpen(false)}
                closeBtn={() => (
                    <a
                        onClick={() => setReplierOpen(false)}
                        className="btn py-2 ttu gray-10"
                    >
                        Cancel
                    </a>
                )}
            />
        </section>
    );
};

export default withApollo(PostPage, { getDataFromTree });
