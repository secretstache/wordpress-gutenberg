export const useUpdateAttribute = (setAttributes) => (attributeName, value) => {
    setAttributes({ [attributeName]: value });
};

