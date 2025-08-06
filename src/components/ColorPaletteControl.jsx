import { BaseControl, ColorPalette } from '@wordpress/components';
import { useThemeColors } from '../hooks/index.js';

export const ColorPaletteControl = ({
    label = 'Color',
    value,
    attributeName,
    setAttributes,
    allowedColors,
    ...other
}) => {
    const colors = useThemeColors(allowedColors);

    const onChange = (colorValue) => {
        const selectedColor = colors.find(color => color.color === colorValue);

        if (colorValue) {
            setAttributes({
                [attributeName]: {
                    value: colorValue,
                    slug: selectedColor?.slug || '',
                }
            })
        } else {
            setAttributes({
                [attributeName]: {
                    value: '',
                    slug: '',
                }
            })
        }
    };

    return (
        <BaseControl label={label}>
            <ColorPalette
                colors={colors}
                value={value}
                disableCustomColors={true}
                onChange={onChange}
                {...other}
            />
        </BaseControl>
    );
};
