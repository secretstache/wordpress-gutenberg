import { useSelect, useDispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useLayoutEffect, useState } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { plus as plusIcon } from '@wordpress/icons';
import { createBlock } from '@wordpress/blocks';

import { useParentBlock } from './useParentBlock';

export const useTabs = (tabsClientId, tabItemName) => {
    const { insertBlock } = useDispatch(blockEditorStore);

    const {
        tabs,
        tabsCount,
        tabsOrder,

        selectedBlock,
        selectedBlockClientId,
    } = useSelect(
        (select) => {
            const {
                getBlock,
                getBlockCount,
                getSelectedBlock,
                getSelectedBlockClientId,
                getBlockOrder,
                getBlockRootClientId,
            } = select(blockEditorStore);

            return {
                tabs: getBlock(tabsClientId)?.innerBlocks || [],
                tabsCount: getBlockCount(tabsClientId),
                tabsOrder: getBlockOrder(tabsClientId),

                selectedBlock: getSelectedBlock(),
                selectedBlockClientId: getSelectedBlockClientId(),
            };
        },
        [ tabsClientId ],
    );

    const [ activeItemId, setActiveItemId ] = useState(null);

    useLayoutEffect(() => {
        if (tabs.length > 0 && !activeItemId) {
            setActiveItemId(tabs[0].clientId);
        }
    }, [ tabs, activeItemId ]);

    const parentBlock = useParentBlock(tabItemName, tabsClientId);

    useLayoutEffect(() => {
        if (parentBlock) {
            setActiveItemId(parentBlock.clientId);
        }
    }, [ parentBlock ]);

    const createTab = (blockName, attributes = {}, position = tabsCount) => {
        const newTab = createBlock(blockName, attributes);
        insertBlock(newTab, position, tabsClientId);

        return newTab;
    };

    const onTabAppenderClick = () => {
        const newItem = createTab(tabItemName);
        setActiveItemId(newItem.clientId);
    };

    const TabAppender = ({ label = 'Add new tab', ...other }) => (
        <Button
            className="bc-add-new-child-btn"
            icon={plusIcon}
            label={label}
            onClick={onTabAppenderClick}
            {...other}
        />
    );

    return {
        tabs,
        tabsCount,
        tabsOrder,

        selectedBlock,
        selectedBlockClientId,
        parentBlock,

        activeItemId,
        setActiveItemId,

        TabAppender,
        onTabAppenderClick,
        createTab,
    };
};
