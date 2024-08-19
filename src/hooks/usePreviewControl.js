import { useCallback, useMemo, useState } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

const defaultLabel = 'Enable Preview';
const defaultHelpText = 'Please check this option to see how the block will actually look and behave on the frontend.';

export const usePreviewControl = () => {
    const [ isPreview, setIsPreview ] = useState(false);

    const onChange = useCallback(() => {
        setIsPreview(prev => !prev);
    }, []);

    const PreviewControl = useMemo(() => {
        return ({ label = defaultLabel, helpText = defaultHelpText, ...props }) => (
            <ToggleControl
                label={label}
                help={helpText}
                checked={isPreview}
                onChange={onChange}
                {...props}
            />
        );
    });

    return {
        isPreview,
        setIsPreview,
        PreviewControl,
    };
};
