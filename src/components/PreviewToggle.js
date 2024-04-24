import { ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

export const PreviewToggle = ({ disabled, onPreviewChange }) => {
    const [isPreview, setIsPreview] = useState(false);

    const handlePreviewChange = () => {
        const newPreviewState = !isPreview;
        setIsPreview(newPreviewState);
        onPreviewChange(newPreviewState);
    };

    return (
        <ToggleControl
            label="Enable Preview"
            help="Please check this option to see how the block will actually look and behave on the frontend."
            checked={isPreview}
            onChange={handlePreviewChange}
            disabled={disabled}
        />
    );
};
