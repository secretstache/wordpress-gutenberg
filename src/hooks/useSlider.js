import { useEffect, useRef } from '@wordpress/element';

export const useSlider = (isPreview, items, setup) => {
    const ref = useRef(null);

    useEffect(() => {
        let instance;

        if (isPreview && items?.length && ref?.current) {
            instance = setup(ref.current);
        }

        return () => {
            instance?.destroy();
        };
    }, [isPreview, items]);

    return ref;
};
