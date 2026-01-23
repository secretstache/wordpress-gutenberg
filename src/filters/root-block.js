import { addFilter, removeFilter } from '@wordpress/hooks';

export class RootBlockFilter {
    name = 'ssm/set-root-block';
    isAdded = false;

    constructor(
        rootBlockName = 'ssm/section-wrapper',
        postTypes = ['page', 'post', 'ssm_design_system'],
    ) {
        this.rootBlockName = rootBlockName;
        this.postTypes = postTypes;
    }

    add() {
        addFilter(
            'blocks.registerBlockType',
            this.name,
            (settings, name) => {
                const isRootBlock = name === this.rootBlockName;
                const isBaseBlock = name === 'core/block';
                const hasAncestor = !!settings?.ancestor;
                const hasParent = !!settings?.parent;

                if (!isRootBlock && !isBaseBlock && !hasAncestor && !hasParent) {
                    settings.ancestor = [this.rootBlockName];
                }

                return settings;
            },
            10,
        );

        this.isAdded = true;
    }

    remove() {
        removeFilter('blocks.registerBlockType', this.name);
        this.isAdded = false;
    }
}
