import { subscribe, select, dispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/* WordPress's own empty-canvas fallback (clicking/focusing the "Type / to
   choose a block" prompt) inserts core/paragraph with no ancestor check,
   bypassing RootBlockFilter's "everything lives inside the root block" rule.
   getBlockCount() with no rootClientId only ever reflects the top-level
   canvas, so this never fires for an emptied-out Column/Group — those still
   fall back to the normal default block. */
export class RootBlockDefaultFilter {
    name = 'ssm/root-block-default';
    isAdded = false;
    unsubscribe = null;

    constructor(
        rootBlockName = 'ssm/section-wrapper',
        postTypes = ['page', 'post', 'ssm_design_system'],
    ) {
        this.rootBlockName = rootBlockName;
        this.postTypes = postTypes;
    }

    add() {
        let previousCount = select('core/block-editor').getBlockCount();

        this.unsubscribe = subscribe(() => {
            const currentCount = select('core/block-editor').getBlockCount();

            if (previousCount > 0 && currentCount === 0) {
                dispatch('core/block-editor').insertBlock(createBlock(this.rootBlockName));
            }

            previousCount = currentCount;
        }, 'core/block-editor');

        this.isAdded = true;
    }

    remove() {
        this.unsubscribe?.();
        this.unsubscribe = null;
        this.isAdded = false;
    }
}
