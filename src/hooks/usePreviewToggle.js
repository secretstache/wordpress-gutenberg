import { useState } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

const defaultLabel = 'Enable Preview';
const defaultHelpText = 'Please check this option to see how the block will actually look and behave on the frontend.';

export const usePreviewToggle = (props = {}) => {
    const {
        disabled = false,
        label = defaultLabel,
        helpText = defaultHelpText,
    } = props;

    const [ isPreview, setIsPreview ] = useState(false);

    const onChange = () => setIsPreview(prev => !prev);

    const renderPreviewToggle = () => (
        <ToggleControl
            label={label}
            help={helpText}
            checked={isPreview}
            onChange={onChange}
            disabled={disabled}
        />
    );

    return {
        isPreview,
        renderPreviewToggle
    };
};
