import { BaseControl, ColorPalette } from '@wordpress/components';
import { useThemeColors, useColorChange } from '../hooks/index.js';

export const ColorPaletteControl = ({
    label = 'Color',
    value,
    attributeName,
    setAttributes,
    allowedColors,
}) => {
    const colors = useThemeColors(allowedColors);
    const onColorChange = useColorChange(colors, setAttributes);

    return (
        <BaseControl label={label}>
            <ColorPalette
                colors={colors}
                value={value}
                disableCustomColors={true}
                onChange={(colorValue) => onColorChange(colorValue, attributeName)}
            />
        </BaseControl>
    );
};
