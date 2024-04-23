import { ToggleControl } from '@wordpress/components';

export const PreviewToggle = ({ attributes, setAttributes, disabled }) => {
    const { isPreview } = attributes;

    // TODO: useState instead of attributes
    const handlePreviewChange = () => {
        setAttributes({ isPreview: !isPreview });
    };

    // TODO: <BlockControls> will be duplicated if the parent block has the another one <BlockControls>
    return (
        <>
            <ToggleControl
                label="Enable Preview"
                help="Please check this option to see how the block will actually look and behave on the frontend."
                checked={isPreview}
                onChange={handlePreviewChange}
                disabled={disabled}
            />
        </>
    );
};
