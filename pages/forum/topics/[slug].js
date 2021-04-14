// Component
import BaseLayout from '@/layouts/BaseLayout';

import { useQuery } from '@apollo/client';
import { TOPIC_BY_SLUG, POSTS_BY_TOPIC } from '@/apollo/queries';
import { useRouter } from 'next/router';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';

import PostItem from '@/components/forum/PostItem';

const useInitialData = () => {
    const router = useRouter();
    const { slug } = router.query;
    const useGetTopicBySlug = (options) => useQuery(TOPIC_BY_SLUG, options);
    const useGetPostsByTopic = (options) => useQuery(POSTS_BY_TOPIC, options);
    const { data: dataT } = useGetTopicBySlug({ variables: { slug } });
    const { data: dataP } = useGetPostsByTopic({ variables: { slug } });
    const topic = (dataT && dataT.topicBySlug) || {};
    const posts = (dataP && dataP.postsByTopic) || [];
    return { topic, posts };
};

const Posts = () => {
    const { topic, posts } = useInitialData();

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
                <section>
                    <div className="fj-post-list">
                        {topic._id && (
                            <PostItem
                                post={topic}
                                className="topic-post-lead"
                            />
                        )}
                        {posts.map((post) => (
                            <div key={post._id} className="row">
                                <div className="col-md-9">
                                    <PostItem post={post} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </BaseLayout>
    );
};

export default withApollo(Posts, { getDataFromTree });
