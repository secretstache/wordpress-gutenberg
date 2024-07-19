import { createBlock } from '@wordpress/blocks';
import { dispatch } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';
import { throttle } from 'es-toolkit';

import { waitForContainer } from '../waitForContainer/index.js';

const ROOT_APPENDER_SELECTOR = '.block-list-appender.wp-block';
const ROOT_CONTAINER_SELECTOR = '.is-root-container';

/**
 * Sets up the event listener for the appender click event and updates aria-label and tooltip text.
 * @param {HTMLElement} element - The appender element to handle.
 * @param {string} blockName - The name of the block to be created when the appender is clicked.
 * @param {string} tooltipText - The tooltip text displayed on the appender.
 */
const handleRootAppender = (element, blockName, tooltipText) => {
    if (!element) return;

    updateAriaLabelAndTooltip(element, tooltipText);
    element.addEventListener('click', () => onBlockAppenderClick(blockName));

    const appenderToggle = element.querySelector('.block-list-appender__toggle.block-editor-button-block-appender');
    if (appenderToggle) {
        observeTooltip(appenderToggle, tooltipText);
    }
};

/**
 * Updates the aria-label and visually hidden text for accessibility.
 * @param {HTMLElement} element - The appender element to update.
 * @param {string} tooltipText - The tooltip text displayed on the appender.
 */
const updateAriaLabelAndTooltip = (element, tooltipText) => {
    const appenderToggle = element.querySelector('.block-list-appender__toggle.block-editor-button-block-appender');
    if (!appenderToggle) return;

    appenderToggle.setAttribute('aria-label', tooltipText);

    const visuallyHidden = appenderToggle.querySelector('.components-visually-hidden');
    if (visuallyHidden) {
        visuallyHidden.textContent = tooltipText;
    }
};

/**
 * Sets up a mutation observer to watch for changes to the `aria-describedby` attribute and update the tooltip text.
 * @param {HTMLElement} appenderToggle - The appender toggle button element.
 * @param {string} tooltipText - The tooltip text displayed on the appender.
 */
const observeTooltip = (appenderToggle, tooltipText) => {
    const tooltipObserver = new MutationObserver(
        throttle((mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'aria-describedby') {
                    const tooltipId = appenderToggle.getAttribute('aria-describedby');
                    if (tooltipId) {
                        const tooltip = document.getElementById(tooltipId);
                        if (tooltip) {
                            tooltip.textContent = tooltipText;
                        }
                    }
                }
            });
        }, 100),
    );

    const tooltipObserverConfig = {
        attributes: true,
        attributeFilter: ['aria-describedby'],
    };

    tooltipObserver.observe(appenderToggle, tooltipObserverConfig);
};

/**
 * Event handler function that creates and inserts the specified block when the appender is clicked.
 * @param {string} blockName - The name of the block to be created when the appender is clicked.
 */
const onBlockAppenderClick = (blockName) => {
    const newBlock = createBlock(blockName);
    dispatch('core/block-editor').insertBlock(newBlock);
};

/**
 * Initializes the mutation observers and handles the root appender.
 * @param {string} blockName - The name of the block to be created when the appender is clicked.
 * @param {string} tooltipText - The tooltip text displayed on the appender.
 */
const initialize = (blockName, tooltipText) => {
    const rootContainer = document.querySelector(ROOT_CONTAINER_SELECTOR);
    if (!rootContainer) {
        console.error('Root container not found');

        return;
    }

    const rootAppender = rootContainer.querySelector(ROOT_APPENDER_SELECTOR);
    handleRootAppender(rootAppender, blockName, tooltipText);

    const observer = new MutationObserver(
        throttle((mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((addedNode) => {
                        if (addedNode.nodeType === Node.ELEMENT_NODE && addedNode.matches(ROOT_APPENDER_SELECTOR)) {
                            handleRootAppender(addedNode, blockName, tooltipText);
                        }
                    });
                    mutation.removedNodes.forEach((removedNode) => {
                        if (removedNode.nodeType === Node.ELEMENT_NODE && removedNode.matches(ROOT_APPENDER_SELECTOR)) {
                            observer.disconnect();
                            observer.observe(rootContainer, observerConfig);
                        }
                    });
                }
            });
        }, 100),
    );

    const observerConfig = {
        childList: true,
        subtree: false,
    };

    observer.observe(rootContainer, observerConfig);
};

/**
 * Modifies the default block appender in the Gutenberg editor for the top-level block appender
 * that is a direct child of the .is-root-container. It allows you to specify the block name to be
 * created when the appender is clicked and customize the tooltip text displayed on the appender.
 * This function is designed to enhance the block editor's UI and streamline the process of adding specific blocks.
 *
 * @param {string} blockName - The name of the block to be created when the appender is clicked.
 * @param {string} [tooltipText='Add Row'] - The tooltip text displayed on the appender.
 */
export const initRootAppender = (blockName, tooltipText = 'Add Row') => {
    domReady(() => waitForContainer(() => initialize(blockName, tooltipText), ROOT_CONTAINER_SELECTOR));
};
