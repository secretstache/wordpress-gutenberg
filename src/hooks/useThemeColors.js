import { useSelect } from '@wordpress/data';

export const useThemeColors = (allowedColors = []) => {
    return useSelect((select) => {
        const { getSettings } = select('core/block-editor');
        const colors = getSettings()?.colors;

        return allowedColors.length > 0
            ? colors?.filter((color) => allowedColors.includes(color.slug))
            : colors;
    }, [allowedColors]);
};
