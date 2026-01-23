import { addFilter, removeFilter } from '@wordpress/hooks';
import { getBlockTypes } from '@wordpress/blocks';

export class HideRootBlockForOtherFilter {
    name = 'ssm/hide-root-block-for-other';
    isAdded = false;

    constructor(
        rootBlockName = 'ssm/section-wrapper',
        postTypes = ['page', 'post', 'ssm_design_system', 'wp_block'],
    ) {
        this.rootBlockName = rootBlockName;
        this.postTypes = postTypes;
    }

    add() {
        addFilter(
            'blocks.registerBlockType',
            this.name,
            (blockSettings, blockName) => {
                const isRootBlock = blockName === this.rootBlockName;
                const isBaseBlock = blockName === 'core/block';
                const hasOwnAllowedBlocks = !!blockSettings?.allowedBlocks;

                // skip specific blocks
                if (isRootBlock || isBaseBlock || hasOwnAllowedBlocks) {
                    return blockSettings;
                }

                // get all blocks
                const allowedBlocks = getBlockTypes()
                    ?.filter((block) => {
                        const isRootBlock = block.name === this.rootBlockName;
                        const hasParent = !!block?.parent;

                        return !isRootBlock && !hasParent;
                    })
                    ?.map((block) => block.name);

                blockSettings.allowedBlocks = allowedBlocks;

                return blockSettings;
            },
        );

        this.isAdded = true;
    }

    remove() {
        removeFilter('blocks.registerBlockType', this.name);
        this.isAdded = false;
    }
}
