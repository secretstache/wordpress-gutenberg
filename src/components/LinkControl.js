import { BaseControl, CheckboxControl } from '@wordpress/components';
import { URLInput } from '@wordpress/block-editor';

import { deprecationWarning } from '../utils/internal/helpers.js';

export const LinkControl = ({
    url = { value: '#', attrName: 'linkSource' },
    isOpenInNewTab = { value: false, attrName: 'linkIsOpenInNewTab'},
    setAttributes,
    label = 'Source',
}) => {
    deprecationWarning('Warning: LinkControl is deprecated since version 0.4.1 and will be removed in future versions. Please use native one instead.');

    return (
        <>
            <BaseControl label={label}>
                <URLInput
                    className="bc-url-input"
                    value={url.value}
                    onChange={(newUrl) => setAttributes({ [url.attrName]: newUrl })}
                />
            </BaseControl>

            <CheckboxControl
                checked={isOpenInNewTab.value}
                label="Open in a new tab"
                onChange={(newIsOpenInNewTab) => setAttributes({ [isOpenInNewTab.attrName]: newIsOpenInNewTab })}
            />
        </>
    );
};
