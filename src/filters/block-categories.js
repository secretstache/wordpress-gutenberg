import { addFilter, removeFilter } from '@wordpress/hooks';

export class BlockCategoriesFilter {
    name = 'ssm/block-categories';
    isAdded = false;

    constructor(
        categories = {},
        postTypes = ['page', 'post', 'ssm_design_system', 'wp_block'],
    ) {
        this.categories = categories;
        this.postTypes = postTypes;
    }

    add() {
        addFilter(
            'blocks.registerBlockType',
            'ssm/block-categories',
            (settings, name) => {
                const movedBlocks = Object.values(this.categories).flat();

                if (!movedBlocks.includes(name)) {
                    return settings;
                }

                let newCategoryName = '';

                for (const [category, blocks] of Object.entries(this.categories)) {
                    if (blocks.includes(name)) {
                        newCategoryName = category;
                        break;
                    }
                }

                return {
                    ...settings,
                    'category': newCategoryName,
                };
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
