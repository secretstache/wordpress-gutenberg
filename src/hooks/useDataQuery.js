import { useSelect } from '@wordpress/data';

export const useDataQuery = (config, dependencies = []) => {
    const {
        postType,
        curatedPostsIds,

        taxonomySlug,
        curatedTermsIds,

        numberOfPosts = -1,
        extraQueryArgs,
    } = config;

    return useSelect((select) => {
        const queryArgs = {
            per_page: numberOfPosts === -1 ? 100 : numberOfPosts,
            order: 'desc',
            orderby: 'date',
            _embed: true,
            ...extraQueryArgs,
        };

        if (taxonomySlug && curatedTermsIds?.length > 0) {
            queryArgs[taxonomySlug] = curatedTermsIds.join(',');
        }

        if (curatedPostsIds?.length > 0) {
            queryArgs['include'] = curatedPostsIds;
            queryArgs['orderby'] = 'include';
        }

        const preparedPostType = typeof postType === 'function'
            ? postType()
            : postType;

        const postsToShow = select('core').getEntityRecords('postType', preparedPostType, queryArgs);
        const isResolving = select('core/data').isResolving('core', 'getEntityRecords', ['postType', preparedPostType, queryArgs]);

        const isEmpty = (postsToShow !== null && postsToShow?.length === 0) || numberOfPosts === 0;

        return {
            postsToShow,
            isResolving,
            isEmpty,
        };
    }, dependencies);
}
