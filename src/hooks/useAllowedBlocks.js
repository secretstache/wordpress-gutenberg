import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';

export const useAllowedBlocks = (blockName, excludedBlocks) => {
    const allBlocks = useSelect(
        (select) => select('core/blocks').getBlockTypes(),
        [],
    );

    return useMemo(() => allBlocks
            ?.filter((block) => {
                const blockHasParent = !!block?.parent;
                const blockHasAncestor = !!block?.ancestor;

                const isParent = block?.parent && block.parent.includes(blockName);
                const isAncestor = block?.ancestor && block.ancestor.includes(blockName);

                return !excludedBlocks.includes(block.name)
                    && (!blockHasParent || isParent)
                    && (!blockHasAncestor || isAncestor);
            })
            ?.map((block) => block.name),
        [allBlocks, excludedBlocks, blockName],
    );
};
