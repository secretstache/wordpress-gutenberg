import { TabPanel } from '@wordpress/components';
import { useCallback } from '@wordpress/element';

import { SpacingControl } from './SpacingControl.js';

export const ResponsiveSpacingControl = ({
     max = 6,
     min = -1,
     hasMargin = true,
     hasPadding = true,
     onChange,
     value = { desktop: { margin: {}, padding: {} }, mobile: { margin: {}, padding: {} } },
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

    return (
        <TabPanel
            className="bc-responsive-spacing-control"
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
