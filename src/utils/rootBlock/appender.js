import { createBlock } from '@wordpress/blocks';
import { dispatch } from '@wordpress/data';

import { getRootContainer } from '../rootContainer/index.js';

const ROOT_BLOCK_APPENDER_SELECTOR = '.root-block-appender';

/**
 * Initializes the custom button for the root appender.
 * @param {Element} rootContainer - The root container of the editor.
 * @param {string} blockName - The name of the block to be created when the appender is clicked.
 * @param {string} tooltipText - The tooltip text displayed on the appender.
 */
const initialize = (rootContainer, blockName, tooltipText) => {
    const button = document.createElement('button');

    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z"></path></svg>';
    button.className = 'components-button block-editor-button-block-appender root-block-appender';
    button.setAttribute('aria-label', tooltipText);
    button.setAttribute('data-tooltip', tooltipText);

    button.addEventListener('click', () => {
        dispatch('core/block-editor').insertBlock(createBlock(blockName));
    });

    rootContainer.prepend(button);

    return !!rootContainer.querySelector(ROOT_BLOCK_APPENDER_SELECTOR);
};

/**
 * Creates a new top-level block appender. It allows to specify the block name to be
 * created when the appender is clicked and customize the tooltip text displayed on the appender.
 *
 * @param {string} blockName - The name of the block to be created when the appender is clicked.
 * @param {string} [tooltipText='Add Row'] - The tooltip text displayed on the appender.
 */
export const setRootBlockAppender = (blockName, tooltipText = 'Add Row') => {
    const rootContainer = getRootContainer();

    if (rootContainer) {
        initialize(rootContainer, blockName, tooltipText);
    } else {
        console.error('Root container is not found.')
    }
};

export const unsetRootBlockAppender = () => {
    const rootContainer = getRootContainer();

    if (rootContainer) {
        const appender = rootContainer.querySelector(ROOT_BLOCK_APPENDER_SELECTOR);

        if (appender) {
            appender.remove();
        } else {
            console.error('Root block appender is not found.');
        }
    } else {
        console.error('Root container is not found.')
    }
};
