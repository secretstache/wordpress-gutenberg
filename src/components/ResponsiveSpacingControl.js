import { useEffect, useState } from '@wordpress/element';
import { TabPanel } from '@wordpress/components';

import { SpacingControl } from './SpacingControl.js';

export const ResponsiveSpacingControl = ({
     max = 5,
     min = 0,
     hasMargin = true,
     hasPadding = true,
     onChange,
     values = { desktop: { margin: {}, padding: {} }, mobile: { margin: {}, padding: {} } }
 }) => {
    const [desktop, setDesktop] = useState(values.desktop || { margin: {}, padding: {} });
    const [mobile, setMobile] = useState(values.mobile || { margin: {}, padding: {} });

    useEffect(() => {
        onChange({ desktop, mobile });
    }, [desktop, mobile]);

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
                                values={desktop}
                                onChange={(values) => setDesktop(values)}
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
                                values={mobile}
                                onChange={(values) => setMobile(values)}
                            />
                        );
                    default:
                        return null;
                }
            }}
        </TabPanel>
    );
};
