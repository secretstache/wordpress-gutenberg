import { useSelect } from '@wordpress/data';

export const useEntityRecords = (entityType, postType, options) => {
    const {
        query,
        curatedItems,
        selectedCategories,
        categoryKey,
        numberOfItems,
        order = 'desc',
        orderby = 'date',
    } = options;

    const {
        records,
        isLoading,
    } = useSelect((select) => {
        const queryArgs = {
            order,
            orderby,
            _embed: true,
        };

        const handleQuery = (queryType, key, items) => {
            if (query[queryType] && items?.length) {
                queryArgs[key] = items.map((item) => item.value).join(',');
            }
        }

        handleQuery('LATEST_BY_CATEGORY', categoryKey, selectedCategories);
        handleQuery('BY_CATEGORY', categoryKey, selectedCategories);
        handleQuery('CURATED', 'include', curatedItems);

        if (query?.CURATED && curatedItems?.length) {
            queryArgs.orderby = 'include';
        }

        if (numberOfItems) {
            queryArgs.per_page = numberOfItems;
        }

        const records = select('core').getEntityRecords(entityType, postType, queryArgs);
        const isResolving = select('core/data').isResolving('core', 'getEntityRecords', [entityType, postType, queryArgs]);
        const isLoading = isResolving || records === undefined;

        return {
            records,
            isLoading,
        };
    }, [query, curatedItems, selectedCategories, categoryKey, numberOfItems, order, orderby]);

    return {
        records,
        isLoading,
    };
};
