## Overview

The `waitForRootContainer` function is a utility that periodically checks for the presence of the Gutenberg editor's root container, identified by the class `.is-root-container`. Once the container is found, it resolves a promise, allowing for additional initialization logic.

## Function Signature

```javascript
/**
 * Periodically checks for the presence of the Gutenberg editor's root container and resolves when found.
 *
 * @param {number} [maxAttempts=10] - The maximum number of attempts to check for the root container.
 * @param {number} [interval=500] - The interval time (in milliseconds) between attempts.
 * @returns {Promise<Element>} - Resolves with the root container element if found, or rejects if not found after max attempts.
 */
export const waitForRootContainer = (maxAttempts = 10, interval = 500);
```

### Parameters
- **maxAttempts** (`number`, optional): The maximum number of attempts to check for the root container. Default is `10`.
- **interval** (`number`, optional): The interval time (in milliseconds) between each attempt. Default is `500`.

### Returns
- **Promise<Element>**: Resolves with the root container element when found. Rejects with an error if the container is not found after the maximum attempts.

---

## Usage Example
To use the `waitForRootContainer` function, import it into your script and handle the promise:

```javascript
import { waitForRootContainer } from '@secretstache/wordpress-gutenberg';

waitForRootContainer(10, 500)
    .then((rootContainer) => {
        console.log('Gutenberg root container found:', rootContainer);
        // Your initialization logic here
    })
    .catch((error) => {
        console.error('Failed to find Gutenberg root container:', error);
    });
```

### Example Output
In this example:
- The function checks for the Gutenberg root container (identified by `.is-root-container`) up to 10 times, waiting 500ms between each check.
- If the container is found, it resolves with the container element.
- If the container is not found after 10 attempts, it rejects with an error.

---

## getRootContainer

The `getRootContainer` function retrieves the Gutenberg editor's root container element from the DOM.

### Usage Example

```javascript
import { getRootContainer } from '@secretstache/wordpress-gutenberg';

const rootContainer = getRootContainer();
if (rootContainer) {
    console.log('Gutenberg root container found:', rootContainer);
} else {
    console.log('Gutenberg root container not found');
}
```

---

### Notes
- The `getRootContainer` function searches both the main DOM and an iframe (if applicable) for the Gutenberg root container with the class `.is-root-container`.
- `waitForRootContainer` is built on top of `getRootContainer` and provides retry logic for situations where the root container is not immediately available.
