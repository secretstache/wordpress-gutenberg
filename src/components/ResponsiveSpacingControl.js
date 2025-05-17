import { RangeControl, Tooltip } from '@wordpress/components';
import { TabPanel } from '@wordpress/components';
import { useCallback, useEffect, useState } from '@wordpress/element';
import { sidesTop, sidesBottom } from '@wordpress/icons';

const getTabName = (deviceType = 'Desktop') => {
    return deviceType === 'Desktop' ? 'desktop' : 'mobile';
};

export const ResponsiveSpacingControl = ({
    max = 6,
    min = -1,
    hasMargin = true,
    hasPadding = true,
    onChange,
    value = { desktop: { margin: {}, padding: {} }, mobile: { margin: {}, padding: {} } },
    deviceType,
}) => {
    const handleDesktopChange = useCallback(
        (desktop) => {
            onChange({
                desktop: desktop,
                mobile: value.mobile,
            });
        },
        [ onChange, value.mobile ],
    );

    const handleMobileChange = useCallback(
        (mobile) => {
            onChange({
                mobile: mobile,
                desktop: value.desktop,
            });
        },
        [ onChange, value.desktop ],
    );

    const initialTabName = getTabName(deviceType);

    const [ selectedTab, setSelectedTab ] = useState(initialTabName);

    useEffect(() => {
        setSelectedTab(getTabName());
    }, [ deviceType ]);

    return (
        <TabPanel
            className="bc-responsive-spacing-control"
            initialTabName={initialTabName}
            onSelect={setSelectedTab}
            selectedTabName={selectedTab}
            tabs={[
                { name: 'desktop', title: 'Desktop', className: 'bc-responsive-spacing-tab bc-responsive-spacing-tab--desktop' },
                { name: 'mobile', title: 'Mobile', className: 'bc-responsive-spacing-tab bc-responsive-spacing-tab--mobile' },
            ]}
        >
            {(tab) => {
                switch (tab.name) {
                    case 'desktop':
                        return (
                            <SpacingControl
                                key="desktop"
                                hasMargin={hasMargin}
                                hasPadding={hasPadding}
                                max={max}
                                min={min}
                                value={value.desktop}
                                onChange={handleDesktopChange}
                            />
                        );
                    case 'mobile':
                        return (
                            <SpacingControl
                                key="mobile"
                                hasMargin={hasMargin}
                                hasPadding={hasPadding}
                                max={max}
                                min={min}
                                value={value.mobile}
                                onChange={handleMobileChange}
                            />
                        );
                    default:
                        return null;
                }
            }}
        </TabPanel>
    );
};

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
                        afterIcon={sidesTop}
                    />

                    <Control
                        label="Bottom Margin"
                        max={max}
                        min={min}
                        value={value.margin.bottom ?? min}
                        onChange={handleChange('margin', 'bottom')}
                        disabled={disabledMargin.bottom}
                        tooltip={marginTooltips.bottom}
                        afterIcon={sidesBottom}
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
                        afterIcon={sidesTop}
                    />

                    <Control
                        label="Bottom Padding"
                        max={max}
                        min={min}
                        value={value.padding.bottom ?? min}
                        onChange={handleChange('padding', 'bottom')}
                        disabled={disabledPadding.bottom}
                        tooltip={paddingTooltips.bottom}
                        afterIcon={sidesBottom}
                    />
                </>
            )}
        </>
    );
};

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
                    withInputField={false}
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
