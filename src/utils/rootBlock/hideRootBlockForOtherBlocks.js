import { addFilter } from '@wordpress/hooks';
import { getBlockTypes } from '@wordpress/blocks';
import { dispatch } from '@wordpress/data';

export const hideRootBlockForOtherBlocks = (rootBlockName) => {
    addFilter(
        'blocks.registerBlockType',
        'ssm/with-root-block',
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

    dispatch('core/blocks').reapplyBlockTypeFilters();
};
