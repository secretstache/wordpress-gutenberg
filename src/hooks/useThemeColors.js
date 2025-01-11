import { useSelect } from '@wordpress/data';

export const useThemeColors = (allowedColors = []) => {
    return useSelect((select) => {
        const { getSettings } = select('core/block-editor');
        const allColors = getSettings()?.colors || [];

        if (allowedColors.length > 0) {
            const colorMap = new Map(allColors.map(color => [color.slug, color]));

            return allowedColors
                .map(slug => colorMap.get(slug))
                .filter(Boolean);
        }

        return allColors;
    }, [ allowedColors ]);
};

