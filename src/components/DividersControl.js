import { SelectControl, ToggleControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

export const DividersControl = ({
    topDividers = [],
    bottomDividers = [],
    value = { topDivider: '', bottomDivider: '', isIncludeLine: false },
    hasLine = true,
    onChange,
}) => {
    const hasTop = topDividers && topDividers?.length > 0;
    const hasBottom = bottomDividers && bottomDividers?.length > 0;

    const [ topDivider, setTopDivider ] = useState(value?.topDivider || '');
    const [ bottomDivider, setBottomDivider ] = useState(value?.bottomDivider || '');
    const [ isIncludeLine, setIsIncludeLine ] = useState(value?.isIncludeLine || false);

    useEffect(() => {
        onChange({
            topDivider,
            bottomDivider,
            isIncludeLine,
        });
    }, [ topDivider, bottomDivider, isIncludeLine ]);

    return (
        <>
            {
                hasTop && (
                    <SelectControl
                        label="Top Divider"
                        value={topDivider}
                        onChange={(topDivider) => setTopDivider(topDivider)}
                        options={[
                            {
                                label: 'None',
                                value: ''
                            },
                            ...topDividers,
                        ]}

                    />
                )
            }

            {
                hasBottom && (
                    <SelectControl
                        label="Bottom Divider"
                        value={bottomDivider}
                        onChange={(bottomDivider) => setBottomDivider(bottomDivider)}
                        options={[
                            {
                                label: 'None',
                                value: ''
                            },
                            ...bottomDividers,
                        ]}
                    />
                )
            }

            {
                hasLine && (
                    <ToggleControl
                        label="Include Vertical Line leading from this block to the next"
                        checked={isIncludeLine}
                        onChange={() => setIsIncludeLine((prevState) => !prevState)}
                    />
                )
            }
        </>
    );
}
