import { RangeControl, Tooltip } from '@wordpress/components';
import { useCallback } from '@wordpress/element';

import { sidesBottomIcon, sidesTopIcon } from '../icons/index.jsx';

const generateMarks = (min, max) => [
    { value: min, label: min === -1 ? 'Default' : min.toString() },
    ...Array.from({ length: max - min }, (_, i) => ({
        value: min + i + 1,
        label: '',
    })),
];

const Control = ({ label, max, min, value, onChange, disabled, tooltip, ...other }) => (
    <div className="bc-spacing-control-wrapper">
        <Tooltip
            text={tooltip}
            placement="bottom"
            delay={0}
        >
            <div className="bc-spacing-control-content">
                <RangeControl
                    className="bc-spacing-range-control"
                    label={label}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    min={min}
                    max={max}
                    marks={generateMarks(min, max)}
                    resetFallbackValue={-1}
                    renderTooltipContent={(value) => {
                        if (value === -1) return 'Default';

                        return value;
                    }}
                    {...other}
                />
            </div>
        </Tooltip>
    </div>
);

export const SpacingControl = ({
    hasMargin = true,
    hasPadding = true,
    disabledMargin = { top: false, bottom: false },
    disabledPadding = { top: false, bottom: false },
    marginTooltips = { top: '', bottom: '' },
    paddingTooltips = { top: '', bottom: '' },
    max = 6,
    min = -1,
    onChange,
    value = { margin: {}, padding: {} },
}) => {
    const handleChange = useCallback(
        (type, direction) => (newValue) => {
            onChange({
                ...value,
                [type]: {
                    ...value[type],
                    [direction]: newValue,
                },
            });
        },
        [ onChange, value ],
    );

    return (
        <>
            {hasMargin && (
                <>
                    <Control
                        label="Top Margin"
                        max={max}
                        min={min}
                        value={value.margin.top ?? min}
                        onChange={handleChange('margin', 'top')}
                        disabled={disabledMargin.top}
                        tooltip={marginTooltips.top}
                        afterIcon={sidesTopIcon}
                        withInputField={false}
                    />

                    <Control
                        label="Bottom Margin"
                        max={max}
                        min={min}
                        value={value.margin.bottom ?? min}
                        onChange={handleChange('margin', 'bottom')}
                        disabled={disabledMargin.bottom}
                        tooltip={marginTooltips.bottom}
                        afterIcon={sidesBottomIcon}
                        withInputField={false}
                    />
                </>
            )}

            {hasPadding && (
                <>
                    <Control
                        label="Top Padding"
                        max={max}
                        min={min}
                        value={value.padding.top ?? min}
                        onChange={handleChange('padding', 'top')}
                        disabled={disabledPadding.top}
                        tooltip={paddingTooltips.top}
                        afterIcon={sidesTopIcon}
                        withInputField={false}
                    />

                    <Control
                        label="Bottom Padding"
                        max={max}
                        min={min}
                        value={value.padding.bottom ?? min}
                        onChange={handleChange('padding', 'bottom')}
                        disabled={disabledPadding.bottom}
                        tooltip={paddingTooltips.bottom}
                        afterIcon={sidesBottomIcon}
                        withInputField={false}
                    />
                </>
            )}
        </>
    );
};
