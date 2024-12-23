import { addFilter, removeFilter } from '@wordpress/hooks';

/**
 * Adds a filter to unset the root block restrictions by removing the 'ancestor' property from block settings
 * if it includes the specified root block name.
 */
export const unsetRootBlockFilter = {
    add(rootBlockName) {
        addFilter(
            'blocks.registerBlockType',
            'ssm/unset-root-block',
            (settings) => {
                const hasRootAncestor = settings.ancestor && settings.ancestor.includes(rootBlockName);

                if (hasRootAncestor) {
                    settings.ancestor = null;
                }

                return settings;
            },
        );
    },
    remove() {
        removeFilter('blocks.registerBlockType', 'ssm/unset-root-block');
    },
};
