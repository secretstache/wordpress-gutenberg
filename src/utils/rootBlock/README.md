## setRootBlock

The `setRootBlock` function configures a root block in the Gutenberg editor for specific post types. It ensures that only the specified root block can be inserted at the root level for those post types. The function dynamically applies or removes the root block restriction based on the current post type. Optionally, it initializes a custom root block appender with customizable tooltip text and allows specifying callbacks for when the post type matches or does not match.

### Function Signature

```javascript
/**
 * Sets the root block in the Gutenberg editor for specific post types and optionally customizes the tooltip text for the root appender.
 * The function dynamically applies or removes the root block restriction based on the current post type.
 *
 * @param {string} rootBlockName - The name of the block to be set as the root block.
 * @param {string[]} [postTypes=['page', 'ssm_design_system']] - An array of post types where the root block should be set.
 * @param {boolean} [initAppender=true] - Flag to indicate whether to initialize the root appender.
 * @param {string} [appenderTooltipText='Add Row'] - The tooltip text to be displayed on the root appender.
 * @param {Function} [matchPostTypeCallback=null] - A callback function to execute when the current post type matches the specified post types.
 * @param {Function} [notMatchPostTypeCallback=null] - A callback function to execute when the current post type does not match the specified post types.
 */
export const setRootBlock = (
    rootBlockName,
    postTypes = ['page', 'ssm_design_system'],
    initAppender = true,
    appenderTooltipText = 'Add Row',
    matchPostTypeCallback = null,
    notMatchPostTypeCallback = null,
);
```

#### Parameters

- **rootBlockName** (`string`): The name of the block to be set as the root block. This parameter is mandatory.
- **postTypes** (`string[]`, optional): An array of post types where the root block should be set. Default is `['page', 'ssm_design_system']`.
- **initAppender** (`boolean`, optional): Flag to indicate whether to initialize the root appender. Default is `true`.
- **appenderTooltipText** (`string`, optional): The tooltip text to be displayed on the root appender. Default is `'Add Row'`.
- **matchPostTypeCallback** (`Function`, optional): A callback function to execute when the current post type matches the specified post types. Default is `null`.
- **notMatchPostTypeCallback** (`Function`, optional): A callback function to execute when the current post type does not match the specified post types. Default is `null`.

### Usage Example

To use the `setRootBlock` function, import it into your script and pass the necessary parameters:

```javascript
import domReady from '@wordpress/dom-ready';
import { setRootBlock } from '@secretstache/wordpress-gutenberg';

domReady(() => {
  setRootBlock(
    'ssm/section-wrapper',
    ['page', 'post'],
    true,
    'Add Section',
    () => {
      console.log('Root block set for matching post type.');
    },
    () => {
      console.log('Root block unset for non-matching post type.');
    }
  );
});
```

In this example, the function will:

- Set `'ssm/section-wrapper'` as the root block for 'page' and 'post' post types.
- Initialize the root appender with the tooltip text 'Add Section'.
- Execute the `matchPostTypeCallback` when the current post type matches 'page' or 'post'.
- Execute the `notMatchPostTypeCallback` when the current post type does not match.

The function monitors the current post type and dynamically applies or removes the root block restriction as needed.

---

## setRootBlockAppender

The `setRootBlockAppender` function creates a new top-level block appender in the Gutenberg editor. It allows you to specify the block name to be created when the appender is clicked and customize the tooltip text displayed on the appender.

### Function Signature

```javascript
/**
 * Creates a new top-level block appender. It allows specifying the block name to be
 * created when the appender is clicked and customizing the tooltip text displayed on the appender.
 *
 * @param {string} blockName - The name of the block to be created when the appender is clicked.
 * @param {string} [tooltipText='Add Row'] - The tooltip text displayed on the appender.
 */
export const setRootBlockAppender = (blockName, tooltipText = 'Add Row');
```

#### Parameters

- **blockName** (`string`): The name of the block to be created when the appender is clicked. This parameter is mandatory.
- **tooltipText** (`string`, optional): The tooltip text displayed on the appender. Default is `'Add Row'`.

### Usage Example

In your custom theme or plugin, you can import and initialize the function with the desired block name and tooltip text:

```javascript
import domReady from '@wordpress/dom-ready';
import { setRootBlockAppender } from '@secretstache/wordpress-gutenberg';

domReady(() => {
  setRootBlockAppender('ssm/section-wrapper', 'Add Section');
});
```

In this example, clicking the appender will insert the `'ssm/section-wrapper'` block, and the tooltip on the appender will display 'Add Section'.

---

## unsetRootBlockAppender

The `unsetRootBlockAppender` function removes the custom root block appender from the Gutenberg editor.

### Function Signature

```javascript
/**
 * Removes the custom root block appender from the Gutenberg editor.
 */
export const unsetRootBlockAppender = () => {};
```

### Usage Example

To remove the custom root block appender, simply call the function:

```javascript
import { unsetRootBlockAppender } from '@secretstache/wordpress-gutenberg';

unsetRootBlockAppender();
```

---

### Notes

- The `setRootBlock` function internally manages the application and removal of the root block restrictions based on the current post type. It also handles the initialization and removal of the root block appender if `initAppender` is set to `true`.
- The `matchPostTypeCallback` and `notMatchPostTypeCallback` parameters allow you to execute custom logic when the post type matches or does not match the specified `postTypes` array. This can be useful for additional configurations or side effects needed in your application.
- The functions `setRootBlockAppender` and `unsetRootBlockAppender` can be used independently if you need to manually control the appender outside of the `setRootBlock` function.

### Additional Example

If you want to set a root block without initializing the appender and without specifying callbacks:

```javascript
import domReady from '@wordpress/dom-ready';
import { setRootBlock } from '@secretstache/wordpress-gutenberg';

domReady(() => {
    setRootBlock('ssm/section-wrapper', ['page'], false);
});
```

In this case, the root block `'ssm/section-wrapper'` will be set for the 'page' post type, but the root appender will not be initialized.
