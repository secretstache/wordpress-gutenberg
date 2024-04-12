import { BaseControl, CheckboxControl } from '@wordpress/components';
import { URLInput } from '@wordpress/block-editor';
import { useLinkChange } from '../utils/index';

export const LinkControl = ({
    buttonSource,
    isButtonOpenInNewTab,
    setAttributes,
}) => {
    const onLinkChange = useLinkChange(setAttributes);

    return (
        <>
            <BaseControl label="Source">
                <URLInput
                    className="bc-url-input"
                    value={buttonSource}
                    onChange={(newUrl) => onLinkChange(newUrl, 'buttonSource')}
                />
            </BaseControl>
            <CheckboxControl
                checked={isButtonOpenInNewTab}
                label="Open in a new tab"
                onChange={(newIsOpenInNewTab) =>
                    onLinkChange(newIsOpenInNewTab, 'isButtonOpenInNewTab')}
            />
        </>
    );
};
