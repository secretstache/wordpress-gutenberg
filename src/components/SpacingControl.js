import { RangeControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

const Control = ({ label, max, min, value, onChange }) => (
    <RangeControl
        label={label}
        value={value}
        onChange={onChange}
        initialPosition={0}
        max={max}
        min={min}
        marks={true}
    />
);

export const SpacingControl = ({
    hasMargin = true,
    hasPadding = true,
    max = 5,
    min = 0,
    onChange,
    value = { margin: {}, padding: {} }
}) => {
    const [ margin, setMargin ] = useState(value?.margin || {});
    const [ padding, setPadding ] = useState(value?.padding || {});

    useEffect(() => {
        onChange({ margin, padding });
    }, [ margin, padding ]);

    return (
        <>
            {hasMargin && (
                <>
                    <Control
                        label="Top Margin"
                        max={max}
                        min={min}
                        value={margin.top || min}
                        onChange={(topMargin) =>
                            setMargin((prev) => ({ ...prev, top: topMargin }))
                        }
                    />

                    <Control
                        label="Bottom Margin"
                        max={max}
                        min={min}
                        value={margin.bottom || min}
                        onChange={(bottomMargin) =>
                            setMargin((prev) => ({ ...prev, bottom: bottomMargin }))
                        }
                    />
                </>
            )}

            {hasPadding && (
                <>
                    <Control
                        label="Top Padding"
                        max={max}
                        min={min}
                        value={padding.top || min}
                        onChange={(topPadding) =>
                            setPadding((prev) => ({ ...prev, top: topPadding }))
                        }
                    />

                    <Control
                        label="Bottom Padding"
                        max={max}
                        min={min}
                        value={padding.bottom || min}
                        onChange={(bottomPadding) =>
                            setPadding((prev) => ({ ...prev, bottom: bottomPadding }))
                        }
                    />
                </>
            )}
        </>
    );
};
