## Overview

The `initBlockAppender` function modifies the default block appender in the Gutenberg editor for the top-level block appender
that is a direct child of the .is-root-container. It allows to specify the block name to be
created when the appender is clicked and customize the tooltip text displayed on the appender.

## Function Signature

```javascript
/**
 * Modifies the default block appender in the Gutenberg editor for the top-level block appender
 * that is a direct child of the .is-root-container. It allows you to specify the block name to be
 * created when the appender is clicked and customize the tooltip text displayed on the appender.
 * This function is designed to enhance the block editor's UI and streamline the process of adding specific blocks.
 *
 * @param {string} blockName - The name of the block to be created when the appender is clicked.
 * @param {string} [tooltipText='Add Row'] - The tooltip text displayed on the appender.
 */
export const initRootAppender = (blockName, tooltipText = 'Add Row');
```

### Parameters

- **blockName** (`string`): The name of the block to be created when the appender is clicked. This parameter is mandatory.
- **tooltipText** (`string`, optional): The tooltip text displayed on the appender. Default is 'Add Row'.

## Usage example

In your custom theme, you can import and initialize the function with the desired block name and tooltip text:

```javascript
import { initBlockAppender } from '@secretstache/wordpress-gutenberg';

initBlockAppender('ssm/section-wrapper', 'Add Row');
```

## How it works

1. **Initialization on DOM Ready**: The function waits for the DOM to be fully loaded using `domReady` before executing the main logic. This ensures that the necessary elements are available in the DOM.

2. **Periodic Check for Root Container**: The `waitForRootContainer` function periodically checks for the presence of the root container element (specified by the selector `.is-root-container`). It retries the check up to a maximum number of attempts (`maxAttempts`) with a specified interval (`interval`).

3. **Handle Root Appender**: When the root appender is found, the `handleRootAppender` function is called. This function sets up the event listener for the click event on the appender and updates the aria-label and tooltip text.

4. **Throttle Updates**: The script uses the `throttle` function from `es-toolkit` to limit the frequency of updates to the tooltip and aria-label attributes. This prevents performance issues caused by too many rapid updates.

5. **Mutation Observers**: Two mutation observers are set up to monitor changes to the DOM:
- One observer watches for changes to the `aria-describedby` attribute of the appender toggle button and updates the tooltip text accordingly.
- The other observer monitors the addition and removal of child nodes in the root container and handles the root appender elements as they appear or disappear.

## Internal Functions

- **handleRootAppender(element, blockName, tooltipText)**: Sets up the event listener for the appender click event and updates aria-label and tooltip text.
- **updateAriaLabelAndTooltip(element, tooltipText)**: Updates the aria-label and visually hidden text for accessibility.
- **observeTooltip(appenderToggle, tooltipText)**: Sets up a mutation observer to watch for changes to the `aria-describedby` attribute and update the tooltip text.
- **onBlockAppenderClick(blockName)**: Event handler function that creates and inserts the specified block when the appender is clicked.
- **initialize(blockName, tooltipText)**: Initializes the mutation observers and handles the root appender.
- **waitForRootContainer(blockName, tooltipText, maxAttempts, interval)**: Periodically checks for the presence of the root container and initializes the script when found.
