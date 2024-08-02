import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';

export const useFilterBlocks = (filter) => {
    const allBlocks = useSelect(
        (select) => select('core/blocks').getBlockTypes(),
        [],
    );

    return useMemo(() => allBlocks
            ?.filter((block) => filter(block))
            ?.map((block) => block.name),
        [ allBlocks, filter ],
    );
};
