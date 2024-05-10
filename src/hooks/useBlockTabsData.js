import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useLayoutEffect, useState } from '@wordpress/element';
import { useParentBlock } from './useParentBlock';
import { createBlock } from '@wordpress/blocks';
import { Button } from '@wordpress/components';
import { plus as plusIcon } from '@wordpress/icons';

export const useBlockTabsData = (clientId, itemBlockName) => {
    const { insertBlock } = useDispatch('core/block-editor');

    const {
        childBlocks,
        innerBlocksCount,
        selectedBlock,
        selectedBlockClientId,
        parentBlockId,
        getBlockRootClientId,
    } = useSelect(
        (select) => {
            const {
                getBlock,
                getBlockCount,
                getSelectedBlock,
                getSelectedBlockClientId,
                getBlockRootClientId,
            } = select(blockEditorStore);

            return {
                childBlocks: getBlock(clientId)?.innerBlocks || [],
                innerBlocksCount: getBlockCount(clientId),
                selectedBlock: getSelectedBlock(),
                selectedBlockClientId: getSelectedBlockClientId(),
                parentBlockId: getBlockRootClientId(getSelectedBlockClientId()),
                getBlockRootClientId,
            };
        },
        [clientId]
    );

    const [activeItemId, setActiveItemId] = useState(null);

    useLayoutEffect(() => {
        if (childBlocks.length > 0 && !activeItemId) {
            setActiveItemId(childBlocks[0].clientId);
        }
    }, [childBlocks, activeItemId]);

    const parentItem = useParentBlock(selectedBlock?.clientId, itemBlockName, {
        rootBlockId: clientId,
        includeSelf: true,
    });

    useLayoutEffect(() => {
        if (parentItem) {
            setActiveItemId(parentItem.clientId);
        } else if (clientId === parentBlockId && selectedBlock?.clientId) {
            setActiveItemId(selectedBlock.clientId);
        }
    }, [selectedBlock, parentItem, clientId, parentBlockId]);

    const addNewChildBlock = (blockName, attributes = {}, position = innerBlocksCount) => {
        const newBlock = createBlock(blockName, attributes);
        insertBlock(newBlock, position, clientId);
        return newBlock;
    };

    const handleAddNewItem = () => {
        const newItem = addNewChildBlock(itemBlockName);
        setActiveItemId(newItem.clientId);
    };

    const AddNewTabButton = ({ label = 'Add new tab' }) => (
        <Button
            className="add-new-child-btn"
            icon={plusIcon}
            label={label}
            onClick={handleAddNewItem}
        />
    );

    return {
        childBlocks,
        innerBlocksCount,
        selectedBlock,
        selectedBlockClientId,
        parentBlockId,
        activeItemId,
        setActiveItemId,
        getBlockRootClientId,
        AddNewTabButton,
    };
};
