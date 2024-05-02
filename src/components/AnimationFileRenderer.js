import { Button, Icon as WPIcon, } from '@wordpress/components';
import { page as pageIcon } from '@wordpress/icons';

export const AnimationFileRenderer = ({ open, animationFile, onRemove }) => (
    <>
        {animationFile?.id ? (
            <>
                <div className="bc-animation-block-json-file" onClick={open}>
                    <WPIcon icon={pageIcon} size={36} />
                    <span>{animationFile?.filename}</span>
                </div>
                <Button
                    variant="secondary"
                    isDestructive
                    className="bc-remove-btn"
                    onClick={onRemove}
                >
                    Remove File
                </Button>
            </>
        ) : (
            <Button variant="secondary" onClick={open}>
                Select File
            </Button>
        )}
    </>
);
