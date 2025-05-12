import { BaseControl, FocalPointPicker } from '@wordpress/components';
import { useCallback, memo } from '@wordpress/element';

import { MediaControl } from './MediaControl.js';
import { MEDIA_TYPE } from '../utils/index.js';

/**
 * Media control with focal point functionality
 *
 * @param {Object} props - Component props
 * @returns {JSX.Element} Component JSX
 */
export const MediaWithFocalPointControl = memo(({
    attributes,
    setAttributes,
    mediaAttributeName = 'media',
    focalPointAttributeName = 'focalPoint',
    mediaLabel = 'Image',
    focalPointLabel = 'Focal Point',
    mediaControlProps = {},
}) => {
    const media = attributes[mediaAttributeName];
    const focalPoint = attributes[focalPointAttributeName] || { x: 0.5, y: 0.5 };

    const onFocalPointChange = useCallback((newFocalPoint) => {
        setAttributes({ [focalPointAttributeName]: newFocalPoint });
    }, [ focalPointAttributeName ]);

    const onMediaSelect = useCallback((newMedia) => {
        setAttributes({
            [mediaAttributeName]: {
                id: newMedia.id,
                url: newMedia.url,
                alt: newMedia.alt || '',
            },

            [focalPointAttributeName]: { x: 0.5, y: 0.5 }
        });
    }, [ mediaAttributeName ]);

    const onMediaRemove = useCallback(() => {
        setAttributes({
            [mediaAttributeName]: {
                id: null,
                url: null,
                alt: null,
            }
        });
    }, [ mediaAttributeName ]);

    return (
        <>
            <BaseControl label={mediaLabel}>
                <MediaControl
                    type={MEDIA_TYPE.IMAGE}
                    mediaId={media?.id}
                    mediaUrl={media?.url}
                    onSelect={onMediaSelect}
                    onRemove={onMediaRemove}
                    {...mediaControlProps}
                />
            </BaseControl>

            {media?.url && (
                <BaseControl label={focalPointLabel}>
                    <FocalPointPicker
                        __nextHasNoMarginBottom
                        url={media.url}
                        value={focalPoint}
                        onDragStart={onFocalPointChange}
                        onDrag={onFocalPointChange}
                        onChange={onFocalPointChange}
                    />
                </BaseControl>
            )}
        </>
    );
});
