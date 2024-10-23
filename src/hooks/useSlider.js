import { useEffect, useRef } from '@wordpress/element';

export const useSlider = ({ isEnabled, setupSlider, cleanCallback }, dependencies = []) => {
    const sliderElRef = useRef(null);
    const sliderInstance = useRef(null);

    useEffect(() => {
        if (isEnabled && sliderElRef?.current) {
            sliderInstance.current = setupSlider(sliderElRef.current);
        }

        return () => {
            if (sliderInstance.current) {
                sliderInstance.current?.destroy();
                sliderInstance.current = null;

                if (cleanCallback) {
                    cleanCallback();
                }
            }
        };
    }, [ isEnabled, ...dependencies ]);

    return {
        sliderElRef,
        sliderInstance: sliderInstance.current,
    };
};
