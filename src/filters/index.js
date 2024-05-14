import { addFilter } from '@wordpress/hooks';

export const setRootBlock = (rootBlockName) => {
    addFilter(
        'blocks.registerBlockType',
        'ssm/with-root-block',
        (settings, name) => {
            // Override the inserter support for blocks that are not the rootBlockName
            if (name !== rootBlockName) {
                settings.ancestor = [rootBlockName];
            }

            return settings;
        }
    );
}

