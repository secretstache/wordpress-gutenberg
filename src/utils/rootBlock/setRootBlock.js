import { addFilter, removeFilter } from '@wordpress/hooks';
import { setRootBlockAppender, unsetRootBlockAppender } from './setRootBlockAppender.js';
import { dispatch, select, subscribe } from '@wordpress/data';

export const addSetRootBlockFilter = (rootBlockName) => {
    addFilter(
        'blocks.registerBlockType',
        'ssm/set-root-block',
        (settings, name) => {
            const isRootBlock = name === rootBlockName;
            const isBaseBlock = name === 'core/block';
            const hasAncestor = !!settings?.ancestor;

            if (!isRootBlock && !isBaseBlock && !hasAncestor) {
                settings.ancestor = [rootBlockName];
            }

            return settings;
        },
    );
};

export const addUnsetRootBlockFilter = (rootBlockName) => {
    addFilter(
        'blocks.registerBlockType',
        'ssm/unset-root-block',
        (settings) => {
            const hasRootAncestor = settings.ancestor && settings.ancestor.includes(rootBlockName);

            if (hasRootAncestor) {
                settings.ancestor = null;
            }

            return settings;
        },
    );
};

export const setRootBlock = (
    rootBlockName,
    postTypes = ['page', 'ssm_design_system'],
    initAppender = true,
    appenderTooltipText = 'Add Row',
    matchPostTypeCallback = null,
    notMatchPostTypeCallback = null,
) => {
    let isRootBlockEnabled = false;

    subscribe(() => {
        const currentPostType = select('core/editor').getCurrentPostType();

        if (!currentPostType) return;

        const isMatchPostType = postTypes.includes(currentPostType);

        if (isMatchPostType) {
            if (!isRootBlockEnabled) {
                removeFilter('blocks.registerBlockType', 'ssm/unset-root-block');
                addSetRootBlockFilter(rootBlockName);
                dispatch('core/blocks').reapplyBlockTypeFilters();

                if (initAppender) {
                    setRootBlockAppender(rootBlockName, appenderTooltipText);
                }

                if (matchPostTypeCallback) {
                    matchPostTypeCallback();
                }

                isRootBlockEnabled = true;
            }
        } else {
            if (isRootBlockEnabled) {
                removeFilter('blocks.registerBlockType', 'ssm/set-root-block');
                addUnsetRootBlockFilter(rootBlockName);
                dispatch('core/blocks').reapplyBlockTypeFilters();

                if (initAppender) {
                    unsetRootBlockAppender(rootBlockName);
                }

                if (notMatchPostTypeCallback) {
                    notMatchPostTypeCallback();
                }

                isRootBlockEnabled = false;
            }
        }
    }, 'core/editor');
}
