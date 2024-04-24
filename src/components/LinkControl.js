import { BaseControl, CheckboxControl } from '@wordpress/components';
import { URLInput } from '@wordpress/block-editor';
import { useUpdateAttribute } from '../utils/index';

export const LinkControl = ({
    url,
    openInNewTab,
    setAttributes,
    urlAttributeName,
    openInNewTabAttributeName,
}) => {
    const updateAttribute = useUpdateAttribute(setAttributes);

    return (
        <>
            <BaseControl label="Source">
                <URLInput
                    className="bc-url-input"
                    value={url}
                    onChange={(newUrl) => updateAttribute(urlAttributeName, newUrl)}
                />
            </BaseControl>
            <CheckboxControl
                checked={openInNewTab}
                label="Open in a new tab"
                onChange={(newOpenInNewTab) =>
                    updateAttribute(openInNewTabAttributeName, newOpenInNewTab)
                }
            />
        </>
    );
};
