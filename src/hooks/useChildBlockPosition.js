import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Hook to get the position of a child block within its parent block.
 *
 * This hook uses the `useSelect` hook from `@wordpress/data` to retrieve information about a specific block
 * and its position within its parent block. It returns an object containing the block, the parent block, and
 * the position of the child block within the parent block's inner blocks array.
 *
 * @param {string} childClientId - The client ID of the child block.
 * @returns {Object} An object containing the block, the parent block, and the position of the child block:
 *                   - {Object|null} block: The block object for the child block.
 *                   - {Object|null} parentBlock: The block object for the parent block.
 *                   - {number} position: The index position of the child block within the parent block's inner blocks array,
 *                                        or -1 if the parent block or child block is not found.
 *
 */
export const useChildBlockPosition = (childClientId) => {
    return useSelect(
        (select) => {
            const block = select(blockEditorStore).getBlock(childClientId);
            const parentClientId = select(blockEditorStore).getBlockRootClientId(childClientId);
            const parentBlock = parentClientId ? select(blockEditorStore).getBlock(parentClientId) : null;
            const position = parentBlock ? parentBlock.innerBlocks.findIndex((block) => block.clientId === childClientId) : -1;

            return { block, parentBlock, position };
        },
        [ childClientId ],
    );
};
