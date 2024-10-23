const warnedMessages = new Set();

/**
 * Logs a deprecation warning, ensuring each message is only logged once.
 *
 * @param {string} message - The deprecation warning message.
 */
export const deprecationWarning = (message) => {
    if (!warnedMessages.has(message)) {
        console.warn(message);
        warnedMessages.add(message);
    }
}
