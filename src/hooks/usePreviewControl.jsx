import { useCallback, useState } from '@wordpress/element';
import { PreviewControl } from '../components/PreviewControl.jsx';

export const usePreviewControl = () => {
    const [ isPreview, setIsPreview ] = useState(false);

    const onChange = useCallback(() => {
        setIsPreview(prev => !prev);
    }, []);

    const control = (props) => (
        <PreviewControl
            checked={isPreview}
            onChange={onChange}
            {...props}
        />
    );

    return {
        isPreview,
        setIsPreview,
        PreviewControl: control,
    };
};
