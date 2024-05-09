import { useEffect, useState } from '@wordpress/element';
import { TabPanel } from '@wordpress/components';

import { SpacingControl } from './SpacingControl.js';

export const ResponsiveSpacingControl = ({
     max = 5,
     min = 0,
     hasMargin = true,
     hasPadding = true,
     onChange,
     value = { desktop: { margin: {}, padding: {} }, mobile: { margin: {}, padding: {} } }
 }) => {
    const [ desktop, setDesktop ] = useState(value?.desktop || { margin: {}, padding: {} });
    const [ mobile, setMobile ] = useState(value?.mobile || { margin: {}, padding: {} });

    useEffect(() => {
        onChange({ desktop, mobile });
    }, [ desktop, mobile ]);

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
                                value={desktop}
                                onChange={(value) => setDesktop(value)}
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
                                value={mobile}
                                onChange={(value) => setMobile(value)}
                            />
                        );
                    default:
                        return null;
                }
            }}
        </TabPanel>
    );
};
