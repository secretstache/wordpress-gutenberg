/**
 * Periodically checks for the presence of the container and initializes the script when found.
 *
 * @param {function} initializeFn - The initialization function to call when the container is found.
 * @param {string} [containerClass='.is-root-container'] - The CSS class of the container to check for. Default is '.is-root-container'.
 * @param {number} [maxAttempts=50] - The maximum number of attempts to check for the root container.
 * @param {number} [interval=100] - The interval between each check in milliseconds.
 */
export const waitForContainer = (initializeFn, containerClass = '.is-root-container', maxAttempts = 50, interval = 100) => {
    let attempts = 0;
    const checkInterval = setInterval(() => {
        const rootContainer = document.querySelector(containerClass);
        if (rootContainer) {
            clearInterval(checkInterval);
            initializeFn();
        } else {
            attempts += 1;
            if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                console.error('Max attempts reached. Root container not found.');
            }
        }
    }, interval);
};
