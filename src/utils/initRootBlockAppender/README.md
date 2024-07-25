## Overview

The `initRootBlockAppender` function creates a new top-level block appender. It allows to specify the block name to be
created when the appender is clicked and customize the tooltip text displayed on the appender.

## Function Signature

```javascript
/**
 * Creates a new top-level block appender. It allows to specify the block name to be
 * created when the appender is clicked and customize the tooltip text displayed on the appender.
 *
 * @param {string} blockName - The name of the block to be created when the appender is clicked.
 * @param {string} [tooltipText='Add Row'] - The tooltip text displayed on the appender.
 */
export const initRootBlockAppender = (blockName, tooltipText = 'Add Row');
```

### Parameters

- **blockName** (`string`): The name of the block to be created when the appender is clicked. This parameter is mandatory.
- **tooltipText** (`string`, optional): The tooltip text displayed on the appender. Default is 'Add Row'.

## Usage example

In your custom theme, you can import and initialize the function with the desired block name and tooltip text:

```javascript
import { initRootBlockAppender } from '@secretstache/wordpress-gutenberg';

initRootBlockAppender('ssm/section-wrapper', 'Add Row');
```
