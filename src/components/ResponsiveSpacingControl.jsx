import { TabPanel } from '@wordpress/components';
import { useCallback, useEffect, useState } from '@wordpress/element';

import { SpacingControl } from './SpacingControl.jsx';

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
