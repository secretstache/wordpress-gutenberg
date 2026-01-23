import { select, subscribe } from '@wordpress/data';
import { waitForRootContainer } from '../utils/index.js';

export * from './root-block-appender.jsx';
export * from './root-pattern-appender.jsx';

export const setPostTypePlugins = (plugins, currentPostType) => {
    if (!plugins || !currentPostType) return;

    waitForRootContainer()
        .then(() => {
            plugins?.forEach((plugin) => {
                if (plugin.isRegistered) {
                    plugin.unregister();
                }

                if (plugin.postTypes.includes(currentPostType)) {
                    plugin.register();
                }
            });
        });
};
