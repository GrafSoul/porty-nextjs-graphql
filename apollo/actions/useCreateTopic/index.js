import { useMutation } from '@apollo/client';
import { TOPICS_BY_CATEGORY } from '@/apollo/queries';
import { CREATE_TOPIC } from '@/apollo/mutation';

const useCreateTopic = () =>
    useMutation(CREATE_TOPIC, {
        update(cache, { data: { createTopic } }) {
            try {
                const { topicsByCategory } = cache.readQuery({
                    query: TOPICS_BY_CATEGORY,
                    variables: {
                        category: createTopic.forumCategory.slug,
                    },
                });
                cache.writeQuery({
                    query: TOPICS_BY_CATEGORY,
                    data: {
                        topicsByCategory: [...topicsByCategory, createTopic],
                    },
                    variables: {
                        category: createTopic.forumCategory.slug,
                    },
                });
            } catch (e) {}
        },
    });

export default useCreateTopic;
