import { addFilter } from '@wordpress/hooks';
import { initRootBlockAppender } from './initRootBlockAppender.js';

/**
 * Sets the root block in the Gutenberg editor and optionally adds the root appender.
 *
 * This function registers a filter to override the inserter support for blocks that are not the specified root block name.
 * It also optionally initializes the root appender with the provided block name and tooltip text, and makes the click
 * on the appender insert the specified block.
 *
 * @param {string} rootBlockName - The name of the block to be set as the root block.
 * @param {boolean} [initAppender=true] - Flag to indicate whether to initialize the root appender.
 * @param {string} [appenderTooltipText='Add Row'] - The tooltip text to be displayed on the root appender.
 */
export const setRootBlock = (rootBlockName, initAppender = true, appenderTooltipText = 'Add Row') => {
    addFilter(
        'blocks.registerBlockType',
        'ssm/with-root-block',
        (settings, name) => {
            // Override the inserter support for blocks that are not the rootBlockName
            if (name !== rootBlockName && !settings.ancestor) {
                settings.ancestor = [rootBlockName];
            }

            return settings;
        }
    );

    if (initAppender) {
        initRootBlockAppender(rootBlockName, appenderTooltipText);
    }
}
