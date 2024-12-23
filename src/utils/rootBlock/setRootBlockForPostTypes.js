import { dispatch, select, subscribe } from '@wordpress/data';
import { setRootBlockFilter } from './setRootBlockFilter.js';
import { unsetRootBlockFilter } from './unsetRootBlockFilter.js';
import { rootBlockVisibilityFilter } from './rootBlockVisibilityFilter.js';
import { waitForRootContainer } from '../rootContainer/index.js';
import { setRootBlockAppender, unsetRootBlockAppender } from './appender.js';

/**
 * Configures a root block for specific post types
 *
 * @param {string} rootBlockName - The name of the root block to set.
 * @param {Array<string>} [postTypes=['page', 'post']] - The post types for which the root block should be enabled.
 * @param {Function} [callback] - Optional callback to execute when the root block state changes.
 * @param {Array<Object>} [filters=[rootBlockVisibilityFilter]] - Filters to apply or remove when enabling/disabling the root block.
 * @param {boolean} [initAppender=true] - Whether to initialize the root block appender.
 * @param {string} [appenderTooltipText='Add Row'] - Tooltip text for the root block appender.
 */
export const setRootBlockForPostTypes = (
    rootBlockName,
    postTypes = ['page', 'post'],
    callback,
    filters = [ rootBlockVisibilityFilter ],
    initAppender = true,
    appenderTooltipText = 'Add Row',
) => {
    let isRootBlockEnabled = false;

    waitForRootContainer().then(() => {
        console.log('Root Container found.');

        subscribe(() => {
            const currentPostType = select('core/editor').getCurrentPostType();

            if (postTypes.includes(currentPostType) && !isRootBlockEnabled) {
                isRootBlockEnabled = true;

                setRootBlockFilter.add(rootBlockName);
                unsetRootBlockFilter.remove();

                if (filters?.length > 0) {
                    filters.forEach((filter) => filter.add({ rootBlockName, isRootBlockEnabled, currentPostType }));
                    dispatch('core/blocks').reapplyBlockTypeFilters();
                }

                if (callback) {
                    callback({ isRootBlockEnabled, currentPostType });
                }

                if (initAppender) {
                    setRootBlockAppender(rootBlockName, appenderTooltipText);
                }
            } else if (!postTypes.includes(currentPostType) && isRootBlockEnabled) {
                isRootBlockEnabled = false;

                setRootBlockFilter.remove()
                unsetRootBlockFilter.add(rootBlockName);

                if (filters?.length > 0) {
                    filters.forEach((filter) => filter.remove({ rootBlockName, isRootBlockEnabled, currentPostType }));
                    dispatch('core/blocks').reapplyBlockTypeFilters();
                }

                if (callback) {
                    callback({ isRootBlockEnabled, currentPostType });
                }

                if (initAppender) {
                    unsetRootBlockAppender();
                }
            }
        }, 'core/block-editor');
    })
};
