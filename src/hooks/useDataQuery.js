import { useSelect } from '@wordpress/data';
import { QUERY_TYPE } from '../utils';

// TODO: 1. numberOfPosts -1 is not a valid value, the API requires the per_page to be >= 1
// TODO: 2. make 'dependencies' the separate second argument
// TODO: 3. consider supporting the string value for the getPostType as well as function
export const useDataQuery = (props) => {
    const {
        getPostType,
        queryType,
        curatedPostsIds = [],

        categoriesTaxonomy,
        curatedCategoriesIds = [],

        numberOfPosts = -1, // all posts
        extraQueryArgs,
        dependencies,
    } = props;

    return useSelect((select) => {
        const queryArgs = {
            per_page: numberOfPosts,
            order: 'desc',
            orderby: 'date',
            _embed: true,
            ...extraQueryArgs,
        };

        if (queryType === QUERY_TYPE.BY_CATEGORY && categoriesTaxonomy && curatedCategoriesIds?.length > 0) {
            queryArgs[categoriesTaxonomy] = curatedCategoriesIds.join(',');
        } else if (queryType === QUERY_TYPE.CURATED && curatedPostsIds?.length > 0) {
            queryArgs['include'] = curatedPostsIds;
            queryArgs['orderby'] = 'include';
        }

        const postType = getPostType();

        const postsToShow = select('core').getEntityRecords('postType', postType, queryArgs);
        const isResolving = select('core/data').isResolving('core', 'getEntityRecords', ['postType', postType, queryArgs]);
        const isLoading = isResolving || postsToShow === undefined;

        const isEmpty = postsToShow !== null && postsToShow?.length === 0;

        return {
            postsToShow,
            isLoading,
            isEmpty,
        };
    }, dependencies);
}
