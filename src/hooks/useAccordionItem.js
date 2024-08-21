import { useEffect, useRef } from '@wordpress/element';

export const useAccordionItem = (itemId, activeItemId, setActiveItemId, contentSelector) => {
    const isActive = itemId === activeItemId;
    const blockRef = useRef(null);

    const openContent = () => {
        const content = blockRef.current?.querySelector(contentSelector);
        if (content) {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    };

    const closeContent = () => {
        const content = blockRef.current?.querySelector(contentSelector);
        if (content) {
            content.style.maxHeight = 0;
        }
    };

    const toggleItem = () => {
        setActiveItemId(isActive ? null : itemId);
    };

    useEffect(() => {
        if (isActive) {
            openContent();
        } else {
            closeContent();
        }
    }, [ isActive ]);

    useEffect(() => {
        if (!isActive || !blockRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    openContent();
                }
            }
        });

        resizeObserver.observe(blockRef.current);

        return () => resizeObserver.disconnect();
    }, [ isActive ]);

    return {
        blockRef,
        toggleItem,
        openContent,
        closeContent,
        isActive,
    };
};
