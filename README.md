# ColorPaletteControl

A versatile color selection component for Gutenberg blocks, allowing users to choose between theme colors and custom colors.

## Usage

```jsx
import { ColorPaletteControl, getBackgroundColorClass } from '@secretstache/wordpress-gutenberg';

export const edit = ({ attributes, setAttributes }) => {
    const { backgroundColor } = attributes;

    return (
        <InspectorControls>

            {/* code */}

                <ColorPaletteControl
                    label="Background Color"
                    value={backgroundColor?.value}
                    attributeName="backgroundColor"
                    setAttributes={setAttributes}
                    allowedColors={['red', 'blue', 'green']}
                />

            {/* code */}

        </InspectorControls>
    );
};

// In edit function
const blockProps = useBlockProps({
    className: getBackgroundColorClass(backgroundColor),
    style: backgroundColor?.slug === 'custom' 
        ? { backgroundColor: backgroundColor.value } 
        : {}
});

// In save function
const blockProps = useBlockProps.save({
    className: getBackgroundColorClass(backgroundColor)
});
const style = backgroundColor?.slug === 'custom' 
    ? { backgroundColor: backgroundColor.value } 
    : {};

## Parameters

* `label`: String, control label (default: "Color")
* `value`: String, current color value
* `attributeName`: String, attribute name for storing color
* `setAttributes`: Function to update block attributes
* `allowedColors`: Array of strings, limits theme color choices (optional). If not provided or empty, all colors from theme.json will be displayed.

## Additional Exports

* `useThemeColors`: Hook to get theme colors
* `useColorChange`: Hook to handle color changes
* `getBackgroundColorClass`: Function to generate background color class
