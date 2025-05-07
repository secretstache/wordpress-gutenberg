import { BaseControl, FocalPointPicker } from '@wordpress/components';
import { useCallback, memo } from '@wordpress/element';
import { MediaControl } from '@secretstache/wordpress-gutenberg';

/**
 * Media control with focal point functionality
 *
 * @param {Object} props - Component props
 * @returns {JSX.Element} Component JSX
 */
export const MediaFocalPointControl = memo(({
    attributes,
    setAttributes,
    mediaAttributeName = 'media',
    focalPointAttributeName = 'focalPoint',
    mediaLabel = 'Image',
    focalPointLabel = 'Focal Point',
    mediaControlProps = {}
}) => {
    const media = attributes[mediaAttributeName];
    const focalPoint = attributes[focalPointAttributeName] || { x: 0.5, y: 0.5 };

    // Handle focal point changes directly
    const handleFocalPointChange = useCallback((newFocalPoint) => {
        setAttributes({ [focalPointAttributeName]: newFocalPoint });
    }, [ focalPointAttributeName ]);

    // Reset focal point to center
    const resetFocalPoint = useCallback(() => {
        setAttributes({ [focalPointAttributeName]: { x: 0.5, y: 0.5 } });
    }, [ focalPointAttributeName ]);

    // Handle media selection
    const handleMediaSelect = useCallback((newMedia) => {
        setAttributes({
            [mediaAttributeName]: {
                id: newMedia.id,
                url: newMedia.url,
                alt: newMedia.alt || '',
            }
        });
        resetFocalPoint();
    }, [ mediaAttributeName, resetFocalPoint ]);

    // Handle media removal
    const handleMediaRemove = useCallback(() => {
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
                    mediaId={media?.id}
                    mediaUrl={media?.url}
                    onSelect={handleMediaSelect}
                    onRemove={handleMediaRemove}
                    {...mediaControlProps}
                />
            </BaseControl>

            {media?.url && (
                <BaseControl label={focalPointLabel}>
                    <FocalPointPicker
                        __nextHasNoMarginBottom
                        url={media.url}
                        value={focalPoint}
                        onDragStart={handleFocalPointChange}
                        onDrag={handleFocalPointChange}
                        onChange={handleFocalPointChange}
                    />
                </BaseControl>
            )}
        </>
    );
});