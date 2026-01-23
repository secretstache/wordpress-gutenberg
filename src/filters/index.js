import { dispatch } from '@wordpress/data';

export * from './hide-root-block-for-other.js';
export * from './inner-blocks-cleanup.jsx';
export * from './root-block.js';
export * from './block-categories.js';

export const setPostTypeFilters = (filters, currentPostType, onSet) => {
    if (!filters || !currentPostType) return;

    filters?.forEach((filter) => {
        if (filter.isAdded) {
            filter.remove();
        }

        if (filter.postTypes.includes(currentPostType)) {
            filter.add();
        }

        dispatch('core/blocks').reapplyBlockTypeFilters();

        if (onSet) onSet();
    });
};
