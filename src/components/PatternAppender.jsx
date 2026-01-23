import { useState } from '@wordpress/element';

import { __experimentalPatternsModal as PatternsModal } from './PatternsModal.jsx';

export const __experimentalPatternAppender = (props) => {
    const { render, rootClientId } = props;

    const [ isModalOpen, setModalOpen ] = useState(false);

    return (
        <>
            { render({ isModalOpen, setModalOpen }) }

            {
                isModalOpen && (
                    <PatternsModal
                        onClose={() => setModalOpen(false)}
                        rootClientId={rootClientId}
                    />
                )
            }
        </>
    );
};
