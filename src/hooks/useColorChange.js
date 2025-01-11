import { deprecationWarning } from '../utils/internal/helpers.js';

/**
 * @deprecated since 0.5.3
 */
export const useColorChange = (colors, setAttributes) => (colorValue, property) => {
    deprecationWarning('Warning: useColorChange is deprecated since version 0.5.3 and will be removed in future versions.');

    const selectedColor = colors.find(color => color.color === colorValue);

    setAttributes({
        [property]: selectedColor
            ? {
                value: colorValue,
                slug: selectedColor.slug,
            }
            : {
                value: '',
                slug: '',
            },
    });
};
