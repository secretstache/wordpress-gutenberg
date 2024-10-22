const styleElementId = 'ssm-hide-root-block-for-inline-inserter';

export const hideRootBlockForInlineInserter = (blockName) => {
    // Construct the CSS rule
    const cssRule = `[id*="-block-${blockName}"] { display: none !important; }`;

    // Create a style element
    const styleElement = document.createElement('style');
    styleElement.id = styleElementId;

    // Set the CSS rule as the content of the style element
    styleElement.appendChild(document.createTextNode(cssRule));

    // Append the style element to the document's head
    document.head.appendChild(styleElement);
};

export const showRootBlockForInlineInserter = (blockName) => {
    const styleElement = document.getElementById(styleElementId);

    if (styleElement) {
        document.head.removeChild(styleElement);
    }
};
