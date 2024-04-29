import { BaseControl, CheckboxControl } from '@wordpress/components';
import { URLInput } from '@wordpress/block-editor';
import { useUpdateAttribute } from '../hooks';

export const LinkControl = ({
    url = { value: '#', attrName: 'linkSource' },
    isOpenInNewTab = { value: false, attrName: 'linkIsOpenInNewTab'},
    setAttributes,
    label = 'Source',
}) => {
    const updateAttribute = useUpdateAttribute(setAttributes);

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
