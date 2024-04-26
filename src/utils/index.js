import apiFetch from '@wordpress/api-fetch';
import { useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import slugify from 'slugify';

export const loadSelectOptions = async (inputValue, postType, mapper = null) => {
    const response = await apiFetch({
        path: `/wp/v2/${postType}?search=${encodeURIComponent(inputValue)}`,
    });

    if (mapper) {
        return response?.map(mapper);
    } else {
        return response?.map((post) => {
            // Create a temporary DOM element to decode HTML entities
            const tempElement = document.createElement('div');
            tempElement.innerHTML = post?.title?.rendered;

            return {
                value: post.id,
                label: tempElement.textContent || tempElement.innerText || '',
            };
        });
    }
};

export const getSlug = (name) => slugify(name, {
    replacement: '-',
    lower: true,
    strict: true,
});

export const cleanSvgString = (svgString) => {
    if (svgString.startsWith('<?xml')) {
        const endOfXml = svgString.indexOf('?>');

        if (endOfXml !== -1) {
            svgString = svgString.substring(endOfXml + 2);
        }
    }

    svgString = svgString.trim();

    return svgString;
};


const SVG_MIME_TYPE = 'image/svg+xml';

export const getImage = async (mediaData) => {
    const isSvg = mediaData?.mime === SVG_MIME_TYPE || mediaData?.mime_type === SVG_MIME_TYPE;
    const imagePayload = {
        isSvg,
        imageUrl: null,
        svgCode: null,
        width: mediaData?.width,
        height: mediaData?.height,
    };

    if (isSvg) {
        imagePayload.svgCode = await fetch(mediaData.url).then(response => response.text()).then(cleanSvgString);
    } else {
        imagePayload.imageUrl = mediaData?.url;
    }

    return imagePayload;
};

export const getPhoneNumber = (phone) => {
    if (!phone) return '';

    let formatted = phone;

    const pattern = /^\+\d(\d{3})(\d{3})(\d{4})$/;
    const match = phone.match(pattern);

    if (match) {
        formatted = `${match[1]}-${match[2]}-${match[3]}`;
    }

    return formatted;
};

export const getLocationAddress = (location) => {
    const {
        street_number = '',
        street_name = '',
        city = '',
        state_short = '',
        post_code = '',
    } = location;

    // Start with the street number and name, trimming to remove extra spaces if one is missing
    let addressParts = [`${street_number} ${street_name}`.trim()];

    // Add the city with a line break, but only if there is a city name.
    if (city) {
        addressParts.push(`<br>${city}`);
    }

    // Combine state and postal code intelligently, adding only if they exist
    let statePostalParts = [];
    if (state_short) statePostalParts.push(state_short);
    if (post_code) statePostalParts.push(post_code);
    let statePostal = statePostalParts.join(' ');

    if (statePostal) {
        // Add a comma only if there's something before this part
        addressParts.push(`${addressParts.length > 0 ? ', ' : ''}${statePostal}`);
    }

    return addressParts.join('');
};

// TODO: move to a separate file
export const useEntityRecords = (entityType, postType, options) => {
    const {
        query,
        curatedItems,
        selectedCategories,
        categoryKey,
        numberOfItems,
        order = 'desc',
        orderby = 'date',
    } = options;

    const {
        records,
        isLoading,
    } = useSelect((select) => {
        const queryArgs = {
            order,
            orderby,
            _embed: true,
        };

        const handleQuery = (queryType, key, items) => {
            if (query[queryType] && items?.length) {
                queryArgs[key] = items.map((item) => item.value).join(',');
            }
        }

        handleQuery('LATEST_BY_CATEGORY', categoryKey, selectedCategories);
        handleQuery('BY_CATEGORY', categoryKey, selectedCategories);
        handleQuery('CURATED', 'include', curatedItems);

        if (query?.CURATED && curatedItems?.length) {
            queryArgs.orderby = 'include';
        }

        if (numberOfItems) {
            queryArgs.per_page = numberOfItems;
        }

        const records = select('core').getEntityRecords(entityType, postType, queryArgs);
        const isResolving = select('core/data').isResolving('core', 'getEntityRecords', [entityType, postType, queryArgs]);
        const isLoading = isResolving || records === undefined;

        return {
            records,
            isLoading,
        };
    }, [query, curatedItems, selectedCategories, categoryKey, numberOfItems, order, orderby]);

    return {
        records,
        isLoading,
    };
};

// TODO: move to a separate file
export const useThemeColors = (allowedColors = []) => {
    return useSelect((select) => {
        const { getSettings } = select('core/block-editor');
        const colors = getSettings()?.colors;

        return allowedColors.length > 0
            ? colors?.filter((color) => allowedColors.includes(color.slug))
            : colors;
    }, []);
};

// TODO: move to a separate file
export const useColorChange = (colors, setAttributes) => (colorValue, property) => {
    const selectedColor = colors.find(color => color.color === colorValue);

    setAttributes({
        [property]: selectedColor
            ? {
                value: colorValue,
                slug: selectedColor.slug,
            }
            : null,
    });
};

export const useUpdateAttribute = (setAttributes) => (attributeName, value) => {
    setAttributes({ [attributeName]: value });
};

