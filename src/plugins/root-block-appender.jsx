import { registerPlugin, unregisterPlugin } from '@wordpress/plugins';
import { createPortal } from '@wordpress/element';
import { dispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

import { getRootContainer } from '../utils/index.js';

export class RootBlockAppenderPlugin {
    name = 'root-block-appender';
    isRegistered = false;

    constructor(
        rootBlockName = 'ssm/section-wrapper',
        postTypes = ['page', 'post', 'ssm_design_system'],
        tooltipText = 'Add Row',
    ) {
        this.rootBlockName = rootBlockName;
        this.postTypes = postTypes;
        this.tooltipText = tooltipText;
    }

    register() {
        const container = getRootContainer();

        if (!container) {
            console.error(`[${this.name}] - root container is not found.`);
            return;
        }

        registerPlugin(this.name, {
            render: () => createPortal(
                <button
                    className="components-button block-editor-button-block-appender root-block-appender"
                    onClick={() => dispatch('core/block-editor').insertBlock(createBlock(this.rootBlockName))}
                    aria-label={this.tooltipText}
                    data-tooltip={this.tooltipText}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z"></path></svg>
                </button>,
                container
            ),
        });

        this.isRegistered = true;
    }

    unregister() {
        unregisterPlugin(this.name);
        this.isRegistered = false;
    }
}
