import { BaseControl, ColorPalette } from '@wordpress/components';
import { useThemeColors, useColorChange } from '../hooks';

export const ColorPaletteControl = ({
    label = 'Color',
    value,
    attributeName,
    setAttributes,
    allowedColors = [],
    extraColors = [],
}) => {
    const themeColors = useThemeColors(allowedColors);
    const onColorChange = useColorChange(themeColors, setAttributes);

    const allColors = [...themeColors, ...extraColors];

    return (
        <BaseControl label={label}>
            <ColorPalette
                colors={allColors}
                value={value?.value}
                onChange={(colorValue) => onColorChange(colorValue, attributeName)}
                disableCustomColors={true}
            />
        </BaseControl>
    );
};
