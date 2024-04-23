import { BaseControl, CheckboxControl } from '@wordpress/components';
import { URLInput } from '@wordpress/block-editor';
import { useLinkChange } from '../utils/index';

// TODO: refactor props names
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
                    // TODO: this doesn't work if the attribute has a different name
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
