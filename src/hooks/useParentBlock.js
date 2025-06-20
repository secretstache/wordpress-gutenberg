import { useSelect } from '@wordpress/data';

/**
 * Hook to find a parent block of a specific type, scoped within a certain root block.
 *
 * @param {string} parentBlockName - The block type name to search for as a parent.
 * @param {string} blockClientIdToLimitSearch - The clientId of the block to limit the search within
 * @returns {Object|null} The matching parent block, or null if none is found.
 */
export const useParentBlock = (
    parentBlockName,
    blockClientIdToLimitSearch,
) => {
    return useSelect((select) => {
        const { getBlock, getBlockParents, getSelectedBlock } = select('core/block-editor');

        const currentBlock = getSelectedBlock();

        if (!currentBlock) {
            return null;
        }

        if (currentBlock.clientId === blockClientIdToLimitSearch && currentBlock.name === parentBlockName) {
            return currentBlock;
        }

        // Get the list of parent blocks for the current block, from down to top
        const parentBlocks = getBlockParents(currentBlock.clientId, true);

        // Check if the blockClientIdToLimitSearch is located in the hierarchy of parents blocks
        // of the current(selected) block, i.e. check if it's in the scope of searching
        if (!parentBlocks.includes(blockClientIdToLimitSearch)) {
            return null;
        }

        if (parentBlocks?.length) {
            // Traverse the list of parent blocks to find the target parent block type
            for (let i = 0; i < parentBlocks.length; i++) {
                const parentBlockId = parentBlocks[i];
                const parentBlock = getBlock(parentBlockId);

                if (parentBlock?.name === parentBlockName) {
                    return parentBlock;
                }

                // Stop searching if we reach the top of the scope
                if (blockClientIdToLimitSearch && parentBlockId === blockClientIdToLimitSearch) {
                    break;
                }
            }
        }

        // No matching parent found within the constraints.
        return null;
    }, [ parentBlockName, blockClientIdToLimitSearch ]);
};
