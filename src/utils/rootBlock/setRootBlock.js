import { addFilter, removeFilter } from '@wordpress/hooks';
import { setRootBlockAppender, unsetRootBlockAppender } from './setRootBlockAppender.js';
import { dispatch, select, subscribe } from '@wordpress/data';

/**
 * Adds a filter to set the specified block as the root block by modifying block settings during registration.
 * Blocks other than the root block will have their 'ancestor' property set to the root block name,
 * making them only insertable within the root block.
 *
 * @param {string} rootBlockName - The name of the block to be set as the root block.
 */
export const addSetRootBlockFilter = (rootBlockName) => {
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
};

/**
 * Adds a filter to unset the root block restrictions by removing the 'ancestor' property from block settings
 * if it includes the specified root block name.
 *
 * @param {string} rootBlockName - The name of the block previously set as the root block.
 */
export const addUnsetRootBlockFilter = (rootBlockName) => {
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
};

/**
 * Configures the Gutenberg editor to use a specified block as the root block for certain post types.
 * It dynamically applies or removes the root block restriction based on the current post type.
 * Optionally initializes a custom root block appender and provides callbacks for post type matching.
 *
 * @param {string} rootBlockName - The name of the block to set as the root block.
 * @param {string[]} [postTypes=['page', 'ssm_design_system']] - Array of post types where the root block should be set.
 * @param {boolean} [initAppender=true] - Whether to initialize the root block appender.
 * @param {string} [appenderTooltipText='Add Row'] - Tooltip text for the root block appender.
 * @param {Function} [matchPostTypeCallback=null] - Callback function when the post type matches.
 * @param {Function} [notMatchPostTypeCallback=null] - Callback function when the post type does not match.
 */
export const setRootBlock = (
    rootBlockName,
    postTypes = ['page', 'ssm_design_system'],
    initAppender = true,
    appenderTooltipText = 'Add Row',
    matchPostTypeCallback = null,
    notMatchPostTypeCallback = null,
) => {
    let isRootBlockEnabled = false;

    subscribe(() => {
        const currentPostType = select('core/editor').getCurrentPostType();

        if (!currentPostType) return;

        const isMatchPostType = postTypes.includes(currentPostType);

        if (isMatchPostType) {
            if (!isRootBlockEnabled) {
                removeFilter('blocks.registerBlockType', 'ssm/unset-root-block');
                addSetRootBlockFilter(rootBlockName);
                dispatch('core/blocks').reapplyBlockTypeFilters();

                if (initAppender) {
                    setRootBlockAppender(rootBlockName, appenderTooltipText);
                }

                if (matchPostTypeCallback) {
                    matchPostTypeCallback();
                }

                isRootBlockEnabled = true;
            }
        } else {
            if (isRootBlockEnabled) {
                removeFilter('blocks.registerBlockType', 'ssm/set-root-block');
                addUnsetRootBlockFilter(rootBlockName);
                dispatch('core/blocks').reapplyBlockTypeFilters();

                if (initAppender) {
                    unsetRootBlockAppender(rootBlockName);
                }

                if (notMatchPostTypeCallback) {
                    notMatchPostTypeCallback();
                }

                isRootBlockEnabled = false;
            }
        }
    }, 'core/editor');
};
