import { ColorPalette } from '@wordpress/components';
import { useThemeColors, useColorChange } from '../utils/index';

export const ColorPaletteControl = ({ allowedColors, colorAttribute, attributeName, setAttributes }) => {
    const colors = useThemeColors(allowedColors);
    const onColorChange = useColorChange(colors, setAttributes);

    return (
        <ColorPalette
            colors={colors}
            value={colorAttribute?.value}
            disableCustomColors={true}
            onChange={(colorValue) => onColorChange(colorValue, attributeName)}
        />
    );
};
