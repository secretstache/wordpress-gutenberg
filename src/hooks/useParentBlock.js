import { useSelect } from '@wordpress/data';

/**
 * Hook to find a parent block of a specific type, optionally scoped within a certain root block.
 *
 * @param {string} selectedBlockId - The clientId of the currently selected block.
 * @param {string} parentBlockName - The block type name to search for as a parent.
 * @param {Object} options - Optional settings for the search.
 * @param {string} [options.rootBlockId] - The clientId of the block to limit the search within. If not provided, searches the entire block tree.
 * @param {boolean} [options.includeSelf] - Whether to include the selected block itself if it matches the parentBlockName.
 * @returns {Object|null} The matching parent block, or null if none is found.
 */
export const useParentBlock = (selectedBlockId, parentBlockName, options = {}) => {
    return useSelect((select) => {
        const { getBlock, getBlockRootClientId, getBlockHierarchyRootClientId } = select('core/block-editor');

        if (!selectedBlockId) {
            return null;
        }

        // Destructure with default values to handle optional parameters.
        const { rootBlockId = '', includeSelf = false } = options;

        // If rootBlockId is provided, verify the selected block is within its scope.
        if (rootBlockId) {
            const hierarchyRootClientId = getBlockHierarchyRootClientId(selectedBlockId);
            if (hierarchyRootClientId !== rootBlockId) {
                return null; // The selected block is out of the scope of the root block.
            }
        }

        let currentBlockId = selectedBlockId;
        let currentBlock = getBlock(currentBlockId);

        // Optionally include the selected block if it matches the target type.
        if (includeSelf && currentBlock?.name === parentBlockName) {
            return currentBlock;
        }

        let parentBlockId = getBlockRootClientId(currentBlockId);
        let parentBlock = getBlock(parentBlockId);

        // Traverse up the hierarchy to find the target parent block.
        while (parentBlock && (rootBlockId ? parentBlockId !== rootBlockId : true) && parentBlockId) {
            if (parentBlock.name === parentBlockName) {
                return parentBlock; // Target parent found.
            }
            currentBlockId = parentBlockId;
            parentBlockId = getBlockRootClientId(currentBlockId);
            parentBlock = getBlock(parentBlockId);
        }

        return null; // No matching parent found within the constraints.
    }, [selectedBlockId, parentBlockName, options.rootBlockId, options.includeSelf]);
};
