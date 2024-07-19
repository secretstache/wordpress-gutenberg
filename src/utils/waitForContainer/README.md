## Overview

The `waitForContainer` function is a utility that periodically checks for the presence of a specified container element in the DOM. Once the container is found, it calls the provided initialization function. This is particularly useful for initializing scripts that depend on the presence of specific elements that may not be immediately available when the page loads.

## Function Signature

```javascript
/**
 * Periodically checks for the presence of the container and initializes the script when found.
 *
 * @param {function} initializeFn - The initialization function to call when the root container is found.
 * @param {string} [containerClass='.is-root-container'] - The CSS class of the container to check for. Default is '.is-root-container'.
 * @param {number} [maxAttempts=50] - The maximum number of attempts to check for the root container.
 * @param {number} [interval=100] - The interval between each check in milliseconds.
 */
export const waitForContainer = (initializeFn, containerClass = '.is-root-container', maxAttempts = 50, interval = 100);
```

### Parameters

- **initializeFn** (`function`): The initialization function to call when the container is found.
- **containerClass** (`string`, optional): The CSS class of the container to check for. Default is `.is-root-container`.
- **maxAttempts** (`number`, optional): The maximum number of attempts to check for the root container. Default is `50`.
- **interval** (`number`, optional): The interval between each check in milliseconds. Default is `100`.

## Usage example

To use the `waitForContainer` function, import it into your script and pass the necessary parameters:

```javascript
import { waitForContainer } from '@secretstache/wordpress-gutenberg';

const initialize = () => {
    // Your initialization code here
};

waitForContainer(initialize, '.custom-container-class');
```

In this example, the function will periodically check for the presence of an element with the class `.custom-container-class`. Once found, it will call the `initialize` function.
