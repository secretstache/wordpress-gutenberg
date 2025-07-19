import { useCallback, useEffect, useMemo, useRef } from '@wordpress/element';

export const useAccordionItem = ({
    itemId,
    activeItemId,
    setActiveItemId,
    contentSelector,
    heightObserverDeps = []
}) => {
    const isActive = useMemo(() => itemId === activeItemId, [ itemId, activeItemId ]);
    const blockRef = useRef(null);

    const openContent = useCallback(() => {
        const content = blockRef.current?.querySelector(contentSelector);
        if (content) {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    }, [ contentSelector ]);

    const closeContent = useCallback(() => {
        const content = blockRef.current?.querySelector(contentSelector);
        if (content) {
            content.style.maxHeight = 0;
        }
    }, [ contentSelector ]);

    const toggleItem = useCallback(() => {
        setActiveItemId(isActive ? null : itemId);
    }, [ isActive, setActiveItemId ]);

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
    }, [ isActive, ...heightObserverDeps ]);

    return {
        blockRef,
        toggleItem,
        openContent,
        closeContent,
        isActive,
    };
};
