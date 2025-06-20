import { useSelect, useDispatch, select } from '@wordpress/data';
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

    /**
     * Sets the active tab when focus/selection is inside any inner block of a tab item.
     * For example, if the user selects text inside a tab, that tab should become active.
     */
    useLayoutEffect(() => {
        if (parentBlock) {
            setActiveItemId(parentBlock.clientId);
        }
    }, [ parentBlock ]);

    /**
     * Sets the active tab when the tab-item block itself is selected in the editor sidebar.
     * Ensures the selected tab-item belongs directly to this Tabs block (avoids conflicts if there are multiple Tabs on the page).
     */
    useLayoutEffect(() => {
        // Early return if there is no selected block, or if the selected block is not a tab-item.
        const isTabItemBlockSelected = selectedBlock && selectedBlock.name === tabItemName;

        if (!isTabItemBlockSelected) {
            return;
        }

        // Get the parent block clientId for this selected tab-item block.
        const selectedTabItemBlock = selectedBlock;
        const tabItemParentId = select('core/block-editor').getBlockRootClientId(selectedTabItemBlock.clientId);

        // Only activate the tab if it is a direct child of this Tabs instance.
        const isDirectChildOfCurrentTabs = tabItemParentId === tabsClientId;

        if (isDirectChildOfCurrentTabs) {
            setActiveItemId(selectedTabItemBlock.clientId);
        }
    }, [ selectedBlock, tabItemName, tabsClientId ]);

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
