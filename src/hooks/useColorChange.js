export const useColorChange = (colors, setAttributes) => (colorValue, property) => {
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
