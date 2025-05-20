import { BaseControl, Button, FocalPointPicker, Icon as WPIcon } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { page as pageIcon } from '@wordpress/icons';

import { MEDIA_TYPE } from '../utils/index.js';

export const ImageRenderer = ({
    imageId,
    imageUrl,
    onImageClick,
    onRemoveClick,
    onSelectClick,
    selectButtonLabel = "Select Image",
    removeButtonLabel = "Remove Image",
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
                {removeButtonLabel}
            </Button>
        </>
    ) : (
        <Button
            variant="secondary"
            onClick={onSelectClick}
            className="bc-select-btn"
        >
            {selectButtonLabel}
        </Button>
    );
};

export const VideoRenderer = ({
    videoId,
    videoUrl,
    onRemoveClick,
    onSelectClick,
    selectButtonLabel = "Select Video",
    removeButtonLabel = "Remove Video",
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
                {removeButtonLabel}
            </Button>
        </>
    ) : (
        <Button
            variant="secondary"
            onClick={onSelectClick}
            className="bc-select-btn"
        >
            {selectButtonLabel}
        </Button>
    );
};

export const AnimationRenderer = ({
    animationFileId,
    animationFileUrl,
    animationFileName,
    onSelectClick,
    onRemoveClick,
    selectButtonLabel = "Select File",
    removeButtonLabel = "Remove File",
}) => {
    return animationFileId && animationFileUrl ? (
        <>
            <div className="bc-animation-block-json-file" onClick={onSelectClick}>
                <WPIcon icon={pageIcon} size={36} />
                <span>{animationFileName}</span>
            </div>
            <Button
                variant="secondary"
                isDestructive
                className="bc-remove-btn"
                onClick={onRemoveClick}
            >
                {removeButtonLabel}
            </Button>
        </>
    ) : (
        <Button variant="secondary" onClick={onSelectClick}>
            {selectButtonLabel}
        </Button>
    )
};

export const MediaControl = ({
    type = MEDIA_TYPE.IMAGE,
    label,

    mediaId,
    mediaUrl,
    mediaFileName = '',

    onSelect,
    onRemove,

    selectButtonLabel,
    removeButtonLabel,

    hasFocalPoint = false,
    focalPointLabel = 'Focal Point',
    focalPoint = { x: 0.5, y: 0.5 },
    onFocalPointChange,

    ...other
}) => {
    if (type === MEDIA_TYPE.IMAGE) {
        return (
            <>
                <BaseControl label={label || 'Image'}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelect}
                            allowedTypes={['image', 'image/svg+xml']}
                            accept="image/*"
                            value={mediaId}
                            render={({ open }) => (
                                <ImageRenderer
                                    imageId={mediaId}
                                    imageUrl={mediaUrl}
                                    onImageClick={open}
                                    onSelectClick={open}
                                    onRemoveClick={onRemove}
                                    selectButtonLabel={selectButtonLabel || 'Select Image'}
                                    removeButtonLabel={removeButtonLabel || 'Remove Image'}
                                />
                            )}
                            {...other}
                        />
                    </MediaUploadCheck>
                </BaseControl>

                {
                    hasFocalPoint && mediaId && mediaUrl && (
                        <BaseControl label={focalPointLabel}>
                            <FocalPointPicker
                                __nextHasNoMarginBottom
                                url={mediaUrl}
                                value={focalPoint}
                                onDragStart={onFocalPointChange}
                                onDrag={onFocalPointChange}
                                onChange={onFocalPointChange}
                            />
                        </BaseControl>
                    )
                }
            </>
        );
    } else if (type === MEDIA_TYPE.VIDEO) {
        return (
            <BaseControl label={label || 'Video'}>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={onSelect}
                        allowedTypes={['video']}
                        value={mediaId}
                        render={({ open }) => (
                            <VideoRenderer
                                videoId={mediaId}
                                videoUrl={mediaUrl}
                                onSelectClick={open}
                                onRemoveClick={onRemove}
                                selectButtonLabel={selectButtonLabel || 'Select Video'}
                                removeButtonLabel={removeButtonLabel || 'Remove Video'}
                            />
                        )}
                        {...other}
                    />
                </MediaUploadCheck>
            </BaseControl>
        );
    } else if (type === MEDIA_TYPE.ANIMATION) {
        return (
            <BaseControl label={label || 'Animation'}>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={onSelect}
                        allowedTypes={['application/json', 'text/plain', 'application/lottie']}
                        value={mediaId}
                        render={({ open }) => (
                            <AnimationRenderer
                                animationFileId={mediaId}
                                animationFileUrl={mediaUrl}
                                animationFileName={mediaFileName}
                                onSelectClick={open}
                                onRemoveClick={onRemove}
                                selectButtonLabel={selectButtonLabel || 'Select Animation'}
                                removeButtonLabel={removeButtonLabel || 'Remove Animation'}
                            />
                        )}
                        {...other}
                    />
                </MediaUploadCheck>
            </BaseControl>
        );
    } else {
        throw new Error('Unrecognized media type.');
    }
};
