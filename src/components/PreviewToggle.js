import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToggleControl } from '@wordpress/components';
import { brush as brushIcon } from '@wordpress/icons';

export const PreviewToggle = ({ attributes, setAttributes, disabled }) => {
    const { isPreview } = attributes;

    const handlePreviewChange = () => {
        setAttributes({ isPreview: !isPreview });
    };

    return (
        <>
            <BlockControls group="inline">
                <ToolbarButton
                    icon={brushIcon}
                    onClick={handlePreviewChange}
                    isActive={isPreview}
                    disabled={disabled}
                />
            </BlockControls>
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
