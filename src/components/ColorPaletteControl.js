import { BaseControl, ColorPalette, RadioControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useThemeColors, useColorChange } from '../hooks';

export const ColorPaletteControl = ({
    label = 'Color',
    value,
    attributeName,
    setAttributes,
    allowedColors = [],
}) => {
    const [colorMode, setColorMode] = useState('theme');
    const themeColors = useThemeColors(allowedColors);
    const onColorChange = useColorChange(themeColors, setAttributes);

    const colorModes = [
        { label: 'Theme Colors', value: 'theme' },
        { label: 'Custom Color', value: 'custom' },
    ];

    return (
        <BaseControl label={label}>
            <RadioControl
                selected={colorMode}
                options={colorModes}
                onChange={(newMode) => setColorMode(newMode)}
            />
            <ColorPalette
                colors={colorMode === 'theme' ? themeColors : []}
                value={value}
                onChange={(colorValue) => onColorChange(colorValue, attributeName)}
                disableCustomColors={colorMode === 'theme'}
            />
        </BaseControl>
    );
};
