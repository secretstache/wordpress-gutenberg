import { addFilter, removeFilter } from '@wordpress/hooks';

/**
 * Adds a filter to set the specified block as the root block by modifying block settings during registration.
 * Blocks other than the root block will have their 'ancestor' property set to the root block name,
 * making them only insertable within the root block.
 */
export const setRootBlockFilter = {
    add(rootBlockName) {
        addFilter(
            'blocks.registerBlockType',
            'ssm/set-root-block',
            (settings, name) => {
                const isRootBlock = name === rootBlockName;
                const isBaseBlock = name === 'core/block';
                const hasAncestor = !!settings?.ancestor;

                if (!isRootBlock && !isBaseBlock && !hasAncestor) {
                    settings.ancestor = [rootBlockName];
                }

                return settings;
            },
        );
    },
    remove() {
        removeFilter('blocks.registerBlockType', 'ssm/set-root-block');
    },
};
