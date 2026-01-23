import { useDispatch, useSelect, select } from '@wordpress/data';
import { cloneBlock, createBlock, rawHandler } from '@wordpress/blocks';
import { Button, Modal, TextControl } from '@wordpress/components';
import { useMemo, useState } from '@wordpress/element';
import { __experimentalBlockPatternsList as BlockPatternsList } from '@wordpress/block-editor';

export const __experimentalPatternsModal = ({ onClose, rootClientId }) => {
    const patterns = useSelect(
        (select) => select('core/block-editor').__experimentalGetAllowedPatterns?.(rootClientId),
        [ rootClientId ]
    );

    const { insertBlocks } = useDispatch('core/block-editor');
    const getBlockOrder = select('core/block-editor').getBlockOrder;

    const [ searchValue, setSearchValue ] = useState('');
    const [ selectedCategory, setSelectedCategory ] = useState('all');

    const normalizedPatterns = useMemo(() => (patterns || []).map((pattern, index) => ({
        ...pattern,
        name: typeof pattern?.name === 'string' ? pattern.name : `pattern-${index}`,
        title: typeof pattern?.title === 'string'
            ? pattern.title
            : pattern?.title?.rendered || `Pattern ${index + 1}`,
        blocks: Array.isArray(pattern?.blocks)
            ? pattern.blocks
            : typeof pattern?.content === 'string'
                ? rawHandler({ HTML: pattern.content })
                : [],
    })), [ patterns ]);

    const categories = [
        { name: 'all', label: 'All Patterns' },
        ...Array.from(new Set(normalizedPatterns.flatMap((p) => p.categories || []))).map((name) => ({
            name,
            label: name,
        })),
    ];

    const filteredPatterns = useMemo(() => {
        return normalizedPatterns.filter((pattern) => {
            const matchesSearch = !searchValue || (pattern.title || '').toLowerCase().includes(searchValue.toLowerCase());
            const inCategory = selectedCategory === 'all' || (pattern.categories || []).includes(selectedCategory);

            return matchesSearch && inCategory;
        });
    }, [ normalizedPatterns, searchValue, selectedCategory ]);

    const onClickPattern = (pattern) => {
        const isSyncedUserPattern = pattern?.type === 'user' && pattern?.syncStatus !== 'unsynced' && !!pattern?.id;
        const blocks = isSyncedUserPattern
            ? [createBlock('core/block', { ref: pattern.id })]
            : Array.isArray(pattern.blocks)
                ? pattern.blocks.map((block) => cloneBlock(block))
                : typeof pattern.content === 'string'
                    ? rawHandler({ HTML: pattern.content })
                    : [];

        const isInsideBlock = rootClientId !== null && rootClientId !== undefined;
        const targetClientId = isInsideBlock ? rootClientId : undefined;
        const blockOrder = isInsideBlock ? getBlockOrder(targetClientId) : getBlockOrder();
        const insertIndex = Array.isArray(blockOrder) ? blockOrder.length : 0;

        insertBlocks(blocks, insertIndex, targetClientId);

        onClose();
    };

    return (
        <Modal
            title="Patterns"
            onRequestClose={onClose}
            isFullScreen
        >
            <div className="block-editor-block-patterns-explorer">
                <div className="block-editor-block-patterns-explorer__sidebar">
                    <div className="block-editor-block-patterns-explorer__search">
                        <TextControl
                            __nextHasNoMarginBottom
                            value={searchValue}
                            onChange={setSearchValue}
                            label="Search"
                            placeholder="Search"
                            autoFocus
                        />
                    </div>

                    {!searchValue && (
                        <div className="block-editor-block-patterns-explorer__sidebar__categories-list">
                            {categories.map(({ name, label }) => (
                                <Button
                                    __next40pxDefaultSize
                                    key={name}
                                    label={label}
                                    className="block-editor-block-patterns-explorer__sidebar__categories-list__item"
                                    isPressed={selectedCategory === name}
                                    onClick={() => setSelectedCategory(name)}
                                >
                                    {label}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="block-editor-block-patterns-explorer__list">
                    {searchValue && (
                        <div className="block-editor-block-patterns-explorer__search-results-count">
                            {filteredPatterns.length} {filteredPatterns.length === 1 ? 'pattern found' : 'patterns found'}
                        </div>
                    )}

                    <BlockPatternsList
                        blockPatterns={filteredPatterns}
                        onClickPattern={onClickPattern}
                        isDraggable={false}
                    />
                </div>
            </div>
        </Modal>
    );
};
