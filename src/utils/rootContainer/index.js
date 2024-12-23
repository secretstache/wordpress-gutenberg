const ROOT_CONTAINER_SELECTOR = '.is-root-container';

/**
 * Retrieves the Gutenberg editor's root container element from the DOM or an iframe.
 *
 * @returns {Element|null} - Returns the root container element if found, or null if not found.
 */
export const getRootContainer = () => {
    const rootContainer = document.querySelector(ROOT_CONTAINER_SELECTOR);

    if (rootContainer) {
        return rootContainer;
    }

    const iframe = document.querySelector('.block-editor iframe');
    const iframeDocument = iframe?.contentDocument || iframe?.contentWindow?.document;

    return iframeDocument?.querySelector(ROOT_CONTAINER_SELECTOR) || null;
};

export const waitForRootContainer = (maxAttempts = 10, interval = 500) => {
    return new Promise((resolve, reject) => {
        let attempts = 0;

        const checkRootContainer = () => {
            const rootContainer = getRootContainer();

            if (rootContainer) {
                return resolve(rootContainer);
            } else {
                if (attempts <= maxAttempts) {
                    attempts++;
                    setTimeout(checkRootContainer, interval);
                } else {
                    reject(new Error('Root container not found after max attempts.'));
                }
            }
        };

        checkRootContainer();
    });
};
