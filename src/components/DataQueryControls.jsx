import { createContext, useCallback, useContext, useState, useEffect, useMemo, memo } from '@wordpress/element';
import {
    __experimentalDivider as Divider,
    RangeControl,
    RadioControl,
    SelectControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { arrayMove } from 'react-sortable-hoc';
import Select from 'react-select';

import { SortableSelectAsync } from './SortableSelect.jsx';
import { decodeHtmlEntities, loadSelectOptions, useDefaultSelectOptions } from '../utils/index.js';

const DataQueryContext = createContext({});

/**
 * Main DataQueryControls component that provides context to children
 */
export const DataQueryControls = memo(({
    attributes,
    setAttributes,
    children,
}) => {
    const updateAttribute = useCallback((name, value) => {
        setAttributes({ [name]: value });
    }, []);

    const contextValue = useMemo(() => ({
        attributes,
        setAttributes,
        updateAttribute,
    }), [ attributes ]);

    return (
        <DataQueryContext.Provider value={contextValue}>
            {children}
        </DataQueryContext.Provider>
    );
});

/**
 * Hook to access the query controls context
 */
const useDataQueryContext = () => {
    const context = useContext(DataQueryContext);

    if (!context) {
        throw new Error('Query control components must be used within a DataQueryControls component');
    }

    return context;
};

/**
 * QueryType component for selecting the query type
 */
const QueryType = memo(({
    label = 'Query',
    options = [],
    onChange,
    disabled = false,
    help = '',
    attributeName = 'queryType',
    render = null,
}) => {
    const { attributes, updateAttribute } = useDataQueryContext();
    const queryType = attributes[attributeName];

    const handleChange = useCallback((value) => {
        updateAttribute(attributeName, value);

        if (onChange) {
            onChange(value);
        }
    }, [ attributeName, onChange ]);

    if (render) {
        return render({
            value: queryType,
            onChange: handleChange,
            options,
            disabled,
            attributeName,
        });
    }

    return (
        <>
            <RadioControl
                label={label}
                selected={queryType}
                options={options}
                onChange={handleChange}
                disabled={disabled}
                help={help}
            />

            <Divider />
        </>
    );
});

/**
 * TaxonomySelect component for taxonomy-based filtering
 */
const TaxonomySelect = memo(({
    condition = true,
    attributeName = 'selectedCategories',
    taxonomy = 'category',
    placeholder = 'Categories to show',
    disabled = false,
    render = null,
    customOptions = null,
}) => {
    const { attributes, updateAttribute } = useDataQueryContext();

    const taxonomyTerms = useSelect((select) => {
        if (customOptions) return null;

        return select('core').getEntityRecords('taxonomy', taxonomy, { per_page: -1 });
    }, [ taxonomy, customOptions ]);

    const selectOptions = useMemo(() => {
        if (customOptions) return customOptions;

        return taxonomyTerms?.map(term => ({
            value: term.id,
            label: decodeHtmlEntities(term.name),
        })) || [];
    }, [ taxonomyTerms, customOptions ]);

    const selectedTermIds = attributes[attributeName] || [];

    const selectedOptions = useMemo(() => {
        return selectedTermIds
            .map(id => selectOptions.find(option => option.value === id))
            .filter(Boolean);
    }, [ selectedTermIds, selectOptions ]);

    const onChange = useCallback((newSelected) => {
        const newSelectedIds = newSelected ? newSelected.map(option => option.value) : [];
        updateAttribute(attributeName, newSelectedIds);
    }, [ attributeName ]);

    if (!condition || !taxonomy) return null;

    if (render) {
        return render({
            value: selectedOptions,
            onChange,
            options: selectOptions,
            placeholder,
            disabled,
            attributeName,
        });
    }

    return (
        <>
            <Select
                isMulti
                options={selectOptions}
                value={selectedOptions}
                onChange={onChange}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder={placeholder}
                isDisabled={disabled}
            />

            <Divider />
        </>
    );
});

/**
 * CuratedPosts component for selecting individual posts
 */
const CuratedPosts = memo(({
    condition = true,
    attributeName = 'curatedPosts',
    postType = 'posts',
    placeholder = 'Posts to show',
    disabled = false,
    render = null,
}) => {
    const { attributes, updateAttribute } = useDataQueryContext();
    const curatedPosts = attributes[attributeName] || [];

    const loadPostsOptions = useCallback(async (inputValue) => {
        return await loadSelectOptions(inputValue, postType);
    }, []);

    const { options: defaultPostsOptions } = useDefaultSelectOptions(postType);

    const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
        const newCuratedPosts = arrayMove(curatedPosts, oldIndex, newIndex);
        updateAttribute(attributeName, newCuratedPosts);
    }, [ curatedPosts, attributeName ]);

    const onChange = useCallback((newValue) => {
        updateAttribute(attributeName, newValue);
    }, [ attributeName ]);

    if (!condition) return null;

    if (render) {
        return render({
            value: curatedPosts,
            onChange,
            onSortEnd,
            loadOptions: loadPostsOptions,
            defaultOptions: defaultPostsOptions,
            placeholder,
            disabled,
            attributeName,
        });
    }

    return (
        <>
            <SortableSelectAsync
                onSortEnd={onSortEnd}
                value={curatedPosts}
                defaultOptions={defaultPostsOptions}
                loadOptions={loadPostsOptions}
                onChange={onChange}
                placeholder={placeholder}
                isDisabled={disabled}
            />
            <Divider />
        </>
    );
});

/**
 * NumberOfPosts component for limiting the number of posts
 */
const NumberOfPosts = memo(({
    condition = true,
    attributeName = 'numberOfPosts',
    label = 'Number of Posts',
    min = -1,
    max = 12,
    help = 'The maximum number of posts to show (-1 for no limit)',
    disabled = false,
    render = null,
}) => {
    const { attributes, updateAttribute } = useDataQueryContext();
    const numberOfPosts = attributes[attributeName];

    const onChange = useCallback((value) => {
        updateAttribute(attributeName, value);
    }, [ attributeName ]);

    if (!condition) return null;

    if (render) {
        return render({
            value: numberOfPosts,
            onChange,
            min,
            max,
            help,
            disabled,
            attributeName,
        });
    }

    return (
        <>
            <RangeControl
                label={label}
                value={numberOfPosts}
                onChange={onChange}
                min={min}
                max={max}
                help={help}
                disabled={disabled}
            />

            <Divider />
        </>
    );
});

/**
 * OrderByControl component for controlling ordering
 */
const OrderByControl = memo(({
     condition = true,
     orderByAttributeName = 'orderBy',
     orderAttributeName = 'order',
     disabled = false,
     orderByOptions = [
         { label: 'Date', value: 'date' },
         { label: 'Title', value: 'title' },
     ],
     orderOptions = [
         { label: 'Ascending', value: 'asc' },
         { label: 'Descending', value: 'desc' },
     ],
     render = null,
 }) => {
    const { attributes, updateAttribute } = useDataQueryContext();
    const orderBy = attributes[orderByAttributeName] || 'date';
    const order = attributes[orderAttributeName] || 'desc';

    const onOrderByChange = useCallback((value) => {
        updateAttribute(orderByAttributeName, value);
    }, [ orderByAttributeName ]);

    const onOrderChange = useCallback((value) => {
        updateAttribute(orderAttributeName, value);
    }, [ orderAttributeName ]);

    if (!condition) return null;

    if (render) {
        return render({
            orderBy,
            order,
            onOrderByChange,
            onOrderChange,
            orderByOptions,
            orderOptions,
            disabled,
            orderByAttributeName,
            orderAttributeName,
        });
    }

    return (
        <>
            <SelectControl
                label="Order By"
                value={orderBy}
                options={orderByOptions}
                onChange={onOrderByChange}
                disabled={disabled}
            />

            <SelectControl
                label="Order"
                value={order}
                options={orderOptions}
                onChange={onOrderChange}
                disabled={disabled}
            />

            <Divider />
        </>
    );
});

DataQueryControls.QueryType = QueryType;
DataQueryControls.TaxonomySelect = TaxonomySelect;
DataQueryControls.CuratedPosts = CuratedPosts;
DataQueryControls.NumberOfPosts = NumberOfPosts;
DataQueryControls.OrderBy = OrderByControl;
