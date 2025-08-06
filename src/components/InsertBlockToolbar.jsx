import { BlockControls } from '@wordpress/block-editor';
import { select, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { useCallback } from '@wordpress/element';
import { Toolbar, ToolbarButton } from '@wordpress/components';

export const InsertBlockToolbar = ({ clientId, blockName, group }) => {
    const { insertBlock } = useDispatch('core/block-editor');

    const insertBlockBefore = useCallback(() => {
        const block = createBlock(blockName);
        insertBlock(block, select('core/block-editor').getBlockIndex(clientId));
    }, []);

    const insertBlockAfter = useCallback(() => {
        const block = createBlock(blockName);
        insertBlock(block, select('core/block-editor').getBlockIndex(clientId) + 1);
    }, []);

    return (
        <BlockControls group={group}>
            <Toolbar>
                <ToolbarButton
                    icon="insert-before"
                    label="Add before"
                    onClick={insertBlockBefore}
                />
                <ToolbarButton
                    icon="insert-after"
                    label="Add after"
                    onClick={insertBlockAfter}
                />
            </Toolbar>
        </BlockControls>
    );
};
