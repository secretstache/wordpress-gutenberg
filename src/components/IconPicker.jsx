import {
    MediaPlaceholder,
    MediaUpload,
    MediaUploadCheck,
} from '@wordpress/block-editor';
import { Button, Icon } from '@wordpress/components';

import { editIcon, trashIcon } from '../icons/index.jsx';

export const IconPicker = ({ imageId, imageUrl, imageAlt, svgCode, onSelect, onRemove }) => {
    const hasImage = imageId && imageUrl;
    const isSvg = hasImage && svgCode;

    return (
        <MediaUploadCheck>
            <MediaUpload
                onSelect={onSelect}
                allowedTypes={['image']}
                value={imageId}
                render={({ open }) => {
                    return hasImage ? (
                        <div className="bc-image-wrapper">
                            {hasImage && (
                                isSvg ? (
                                    <div
                                        className="svg-container"
                                        dangerouslySetInnerHTML={{ __html: svgCode }}
                                    />
                                ) : (
                                    <img src={imageUrl} alt={imageAlt || 'icon'} />
                                )
                            )}

                            <div className="bc-image-wrapper__actions">
                                <Button
                                    className="bc-image-wrapper__btn bc-image-wrapper__replace-btn"
                                    type="button"
                                    onClick={open}
                                >
                                    <Icon
                                        icon={editIcon}
                                        size={20}
                                        className="bc-image-wrapper__btn-icon"
                                    />
                                </Button>

                                <Button
                                    className="bc-image-wrapper__btn bc-image-wrapper__remove-btn"
                                    type="button"
                                    onClick={onRemove}
                                >
                                    <Icon
                                        icon={trashIcon}
                                        size={20}
                                        className="bc-image-wrapper__btn-icon"
                                    />
                                </Button>
                            </div>

                            <div className="bc-image-wrapper__overlay" />
                        </div>
                    ) : (
                        <MediaPlaceholder
                            icon="format-image"
                            onSelect={onSelect}
                            allowedTypes={['image', 'image/svg+xml']}
                            labels={{ title: 'Icon Image' }}
                        />
                    );
                }}
            />
        </MediaUploadCheck>
    );
};
