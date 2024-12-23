import { addFilter, removeFilter } from '@wordpress/hooks';
import { getBlockTypes } from '@wordpress/blocks';

export const rootBlockVisibilityFilter = {
    add({ rootBlockName }) {
        addFilter(
            'blocks.registerBlockType',
            'ssm/root-block-visibility',
            (blockSettings, blockName) => {
                const isRootBlock = blockName === rootBlockName;
                const hasOwnAllowedBlocks = !!blockSettings?.allowedBlocks;
                const hasParent = !!blockSettings?.parent;

                if (isRootBlock || hasParent || hasOwnAllowedBlocks) {
                    return blockSettings;
                }

                // get all blockTypes
                blockSettings.allowedBlocks = getBlockTypes()
                    ?.filter((allowedBlock) => {
                        const isRootBlock = allowedBlock.name === rootBlockName;
                        const hasParent = !!allowedBlock?.parent;

                        return !isRootBlock && !hasParent;
                    })
                    ?.map(allowedBlock => allowedBlock.name);

                return blockSettings;
            },
        );
    },
    remove() {
        removeFilter('blocks.registerBlockType', 'ssm/root-block-visibility');
    },
};
