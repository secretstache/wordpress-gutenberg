import { createHigherOrderComponent } from '@wordpress/compose';
import { dispatch, select, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';

export const addInnerBlocksCleanupFilter = (blockName) => {
    // eslint-disable-next-line
    const withInnerBlocksCleanup = createHigherOrderComponent((BlockEdit) => (props) => {
        const { clientId, attributes, name } = props;

        if (name !== blockName) {
            return <BlockEdit {...props} />;
        }

        const innerBlocks = useSelect(
            (select) => select('core/block-editor').getBlock(clientId)?.innerBlocks || [],
            []
        );

        useEffect(() => {
            if (
                attributes.dataSource !== 'none' &&
                innerBlocks.length > 0
            ) {
                dispatch('core/block-editor').updateBlock(clientId, {
                    ...select('core/block-editor').getBlock(clientId),
                    innerBlocks: [],
                });
            }
        }, [ attributes.dataSource, clientId, innerBlocks.length ]);

        return <BlockEdit {...props} />;
    }, 'withInnerBlocksCleanup');

    addFilter(
        'editor.BlockEdit',
        'ssm/with-inner-blocks-cleanup',
        withInnerBlocksCleanup
    );
};
