import { createHigherOrderComponent } from '@wordpress/compose';
import { dispatch, select, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { addFilter, removeFilter } from '@wordpress/hooks';

export class InnerBlocksCleanupFilter {
    name = 'ssm/inner-blocks-cleanup';
    isAdded = false;

    constructor(blockName) {
        this.blockName = blockName;
    }

    add() {
        addFilter(
            'editor.BlockEdit',
            this.name,
            createHigherOrderComponent((BlockEdit) => (props) => {
                    const { clientId, attributes, name } = props;

                    const { dataSource } = attributes;

                    if (name !== this.blockName) {
                        return <BlockEdit {...props} />;
                    }

                    const innerBlocks = useSelect(
                        (select) => select('core/block-editor').getBlock(clientId)?.innerBlocks || [],
                        []
                    );

                    useEffect(() => {
                        if (dataSource !== 'none' && innerBlocks.length > 0) {
                            dispatch('core/block-editor').updateBlock(clientId, {
                                ...select('core/block-editor').getBlock(clientId),
                                innerBlocks: [],
                            });
                        }
                    }, [ dataSource, innerBlocks.length ]);

                    return <BlockEdit {...props} />;
                }, this.name),
            10,
        );

        this.isAdded = true;
    }

    remove() {
        removeFilter('editor.BlockEdit', this.name);
        this.isAdded = false;
    }
}
