import { useSelect } from '@wordpress/data';

export const useDataQuery = (config, dependencies = []) => {
    const {
        postType,
        curatedPostsIds,

        categoriesTaxonomy,
        curatedCategoriesIds,

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

        if (categoriesTaxonomy && curatedCategoriesIds?.length > 0) {
            queryArgs[categoriesTaxonomy] = curatedCategoriesIds.join(',');
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

        const isEmpty = postsToShow !== null && postsToShow?.length === 0;

        return {
            postsToShow,
            isResolving,
            isEmpty,
        };
    }, dependencies);
}
