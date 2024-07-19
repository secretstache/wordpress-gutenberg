## Overview

The `setRootBlock` function configures a root block in the Gutenberg editor and optionally customizes the tooltip text for the root appender. 
This function ensures that only the specified root block can be inserted at the root level. 
Additionally, it allows for optional initialization of the root appender with customizable tooltip text and makes the click on the appender insert the specified block.

## Function Signature

```javascript
/**
 * Sets the root block in the Gutenberg editor and optionally customizes the tooltip text for the root appender.
 *
 * @param {string} rootBlockName - The name of the block to be set as the root block.
 * @param {boolean} [initAppender=true] - Flag to indicate whether to initialize the root appender.
 * @param {string} [appenderTooltipText='Add Row'] - The tooltip text to be displayed on the root appender.
 */
export const setRootBlock = (rootBlockName, initAppender = true, appenderTooltipText = 'Add Row');
```

### Parameters

- **rootBlockName** (`string`): The name of the block to be set as the root block. This parameter is mandatory.
- **initAppender** (`boolean`, optional): Flag to indicate whether to initialize the root appender. Default is `true`.
- **appenderTooltipText** (`string`, optional): The tooltip text to be displayed on the appender. Default is 'Add Row'.

## Usage example

To use the `setRootBlock` function, import it into your script and pass the necessary parameters:

```javascript
import { setRootBlock } from '@secretstache/wordpress-gutenberg';

setRootBlock('ssm/section-wrapper', true, 'Custom Tooltip Text');
```

In this example, the function will set `ssm/section-wrapper` as the root block, customize the tooltip text of the appender to 'Custom Tooltip Text', and initialize the root appender.
