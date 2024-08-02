import { useState } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

import { MediaControl } from './MediaControl.js';
import { MEDIA_TYPE_LABELS } from '../utils/index.js';

export const MediaTypeControl = (props) => {
    const {
        mediaTypes = [],
        mediaId,
        mediaUrl,
        mediaFileName = '',
        mediaOnSelect,
        mediaOnRemove,
    } = props;

    const [selectedMediaType, setSelectedMediaType] = useState(mediaTypes?.[0]);

    const mediaTypesOptions = mediaTypes
        ?.filter((type) => MEDIA_TYPE_LABELS[type]) // Ensure it's an allowed type
        ?.map((type) => ({
            label: MEDIA_TYPE_LABELS[type],
            value: type,
        }));

    return (
        <>
            {
                // TODO: add custom label
                mediaTypes && (
                    <SelectControl
                        label="Media Type"
                        value={selectedMediaType}
                        onChange={(mediaType) => setSelectedMediaType(mediaType)}
                        options={mediaTypesOptions}
                    />
                )
            }

            {
                selectedMediaType && (
                    <MediaControl
                        mediaId={mediaId}
                        mediaUrl={mediaUrl}
                        mediaFileName={mediaFileName}
                        type={selectedMediaType}
                        onSelect={mediaOnSelect}
                        onRemove={mediaOnRemove}
                    />
                )
            }
        </>
    );
}
