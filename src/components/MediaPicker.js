import { Button, Icon as WPIcon } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { page as pageIcon } from '@wordpress/icons';

import { MEDIA_TYPES } from '../utils/index.js';

export const BCImageRenderer = ({
    imageId,
    imageUrl,
    onImageClick,
    onRemoveClick,
    onSelectClick,
}) => {
    return imageId && imageUrl ? (
        <>
            <div className="bc-selected-media-wrapper">
                <img
                    src={imageUrl}
                    className="bc-selected-media bc-selected-media--image"
                    alt="Selected Image"
                    onClick={onImageClick}
                />
            </div>

            <Button
                className="bc-remove-btn"
                onClick={onRemoveClick}
                isSecondary
                isDestructive
            >
                Remove Image
            </Button>
        </>
    ) : (
        <Button
            variant="secondary"
            onClick={onSelectClick}
            className="bc-select-btn"
        >
            Select Image
        </Button>
    );
};

export const BCVideoRenderer = ({
    videoId,
    videoUrl,
    onRemoveClick,
    onSelectClick,
}) => {
    return videoId && videoUrl ? (
        <>
            <div className="bc-selected-media-wrapper">
                <video src={videoUrl} className="bc-selected-media bc-selected-media--video" controls />
            </div>

            <Button
                className="bc-remove-btn"
                onClick={onRemoveClick}
                isSecondary
                isDestructive
            >
                Remove Video
            </Button>
        </>
    ) : (
        <Button
            variant="secondary"
            onClick={onSelectClick}
            className="bc-select-btn"
        >
            Select Video
        </Button>
    );
};

export const BCAnimationRenderer = ({
    animationFileId,
    animationFileUrl,
    animationFileName,
    onSelectClick,
    onRemoveClick,
}) => {
    return animationFileId && animationFileUrl ? (
        <>
            <div className="bc-animation-block-json-file" onClick={onSelectClick}>
                <WPIcon icon={pageIcon} size={36}/>
                <span>{animationFileName}</span>
            </div>
            <Button
                variant="secondary"
                isDestructive
                className="bc-remove-btn"
                onClick={onRemoveClick}
            >
                Remove File
            </Button>
        </>
    ) : (
        <Button variant="secondary" onClick={onSelectClick}>
            Select File
        </Button>
    )
};

export const BCMediaPicker = ({
    mediaId,
    mediaUrl,
    mediaFileName = '',
    onSelect,
    onRemove,
    type = MEDIA_TYPES.IMAGE,
    ...other
}) => {
    if (type === MEDIA_TYPES.IMAGE) {
        return (
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={onSelect}
                    allowedTypes={['image', 'image/svg+xml']}
                    accept="image/*"
                    value={mediaId}
                    render={({ open }) => (
                        <BCImageRenderer
                            imageId={mediaId}
                            imageUrl={mediaUrl}
                            onImageClick={open}
                            onSelectClick={open}
                            onRemoveClick={onRemove}
                        />
                    )}
                    { ...other }
                />
            </MediaUploadCheck>
        );
    } else if (type === MEDIA_TYPES.VIDEO) {
        return (
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={onSelect}
                    allowedTypes={['video']}
                    value={mediaId}
                    render={({ open }) => (
                        <BCVideoRenderer
                            videoId={mediaId}
                            videoUrl={mediaUrl}
                            onSelectClick={open}
                            onRemoveClick={onRemove}
                        />
                    )}
                    { ...other }
                />
            </MediaUploadCheck>
        );
    } else if (type === MEDIA_TYPES.ANIMATION) {
        return (
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={onSelect}
                    allowedTypes={['application/json', 'text/plain', 'application/lottie']}
                    value={mediaId}
                    render={({ open }) => (
                        <BCAnimationRenderer
                            animationFileId={mediaId}
                            animationFileUrl={mediaUrl}
                            animationFileName={mediaFileName}
                            onSelectClick={open}
                            onRemoveClick={onRemove}
                        />
                    )}
                    {...other}
                />
            </MediaUploadCheck>
        );
    } else {
        throw new Error('Unrecognized media type.');
    }
};
