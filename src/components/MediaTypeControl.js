import { useMemo } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

import { MediaControl } from './MediaControl.js';
import { MEDIA_TYPE_LABEL, MEDIA_TYPE } from '../utils/index.js';

export const MediaTypeControl = (props) => {
    const {
        types = [ MEDIA_TYPE.IMAGE, MEDIA_TYPE.VIDEO ],

        selectedType,
        onTypeChange,

        mediaId,
        mediaUrl,
        mediaFileName = '',

        onMediaSelect,
        onMediaRemove,

        label = 'Media Type',
    } = props;

    const typesOptions = useMemo(() => types
        ?.filter((type) => MEDIA_TYPE_LABEL[type]) // Ensure it's an allowed type
        ?.map((type) => ({
            label: MEDIA_TYPE_LABEL[type],
            value: type,
        }))
    , [ types ]);

    return (
        <>
            {
                types && (
                    <SelectControl
                        label={label}
                        value={selectedType}
                        onChange={onTypeChange}
                        options={typesOptions}
                    />
                )
            }

            {
                selectedType && (
                    <MediaControl
                        mediaId={mediaId}
                        mediaUrl={mediaUrl}
                        mediaFileName={mediaFileName}
                        type={selectedType}
                        onSelect={onMediaSelect}
                        onRemove={onMediaRemove}
                    />
                )
            }
        </>
    );
}
