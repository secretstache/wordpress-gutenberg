import { createBlock } from '@wordpress/blocks';
import { dispatch } from '@wordpress/data';

import { waitForContainer } from '../waitForContainer/index.js';

const ROOT_CONTAINER_SELECTOR = '.is-root-container';
const ROOT_BLOCK_APPENDER_SELECTOR = '.is-root-container .root-block-appender';

/**
 * Initializes the custom button for the root appender.
 * @param {string} blockName - The name of the block to be created when the appender is clicked.
 * @param {string} tooltipText - The tooltip text displayed on the appender.
 */
const initialize = (blockName, tooltipText) => {
    const rootContainer = document.querySelector(ROOT_CONTAINER_SELECTOR);

    if (!rootContainer) {
        console.error('Root container not found');

        return;
    }

    const button = document.createElement('button');

    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z"></path></svg>';
    button.className = 'components-button block-editor-button-block-appender root-block-appender';
    button.setAttribute('aria-label', tooltipText);
    button.setAttribute('data-tooltip', tooltipText);

    button.addEventListener('click', () => {
        dispatch('core/block-editor').insertBlock(createBlock(blockName));
    });

    rootContainer.prepend(button);
};

/**
 * Creates a new top-level block appender. It allows to specify the block name to be
 * created when the appender is clicked and customize the tooltip text displayed on the appender.
 *
 * @param {string} blockName - The name of the block to be created when the appender is clicked.
 * @param {string} [tooltipText='Add Row'] - The tooltip text displayed on the appender.
 */
export const setRootBlockAppender = (blockName, tooltipText = 'Add Row') => {
    waitForContainer(() => initialize(blockName, tooltipText), ROOT_CONTAINER_SELECTOR);
};

export const unsetRootBlockAppender = () => {
    const appender = document.querySelector(ROOT_BLOCK_APPENDER_SELECTOR);

    if (appender) {
        appender.remove();
    }
}
