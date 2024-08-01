export const hideRootBlockForInlineInserter = (blockName) => {
    // Construct the CSS rule
    const cssRule = `[id*="-block-${blockName}"] { display: none !important; }`;

    // Create a style element
    const styleElement = document.createElement('style');

    // Set the CSS rule as the content of the style element
    styleElement.appendChild(document.createTextNode(cssRule));

    // Append the style element to the document's head
    document.head.appendChild(styleElement);
};
