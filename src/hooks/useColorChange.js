export const useColorChange = (colors, setAttributes) => (colorValue, property) => {
    const selectedColor = colors.find(color => color.color === colorValue);

    setAttributes({
        [property]: colorValue
            ? {
                value: colorValue,
                slug: selectedColor ? selectedColor.slug : 'custom',
            }
            : null,
    });
};
