import { filters } from '@wordpress/hooks';
import apiFetch from '@wordpress/api-fetch';
import { select, subscribe, useSelect } from '@wordpress/data';
import { getBlockType, registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import slugify from 'slugify';
import classNames from 'classnames';
import debounce from 'debounce-promise';
import { useMemo } from '@wordpress/element';

let controller;

/**
 * Performs the raw REST API request for loading select options.
 * Automatically aborts any previous pending request.
 *
 * @param {string} inputValue - Search term used to filter posts.
 * @param {string} postType - WordPress post type slug (e.g., "post", "page", custom type).
 * @param {Function|null} [mapper=null] - Optional callback to transform each API result.
 * @param {Object} [extraParams={}] - Additional query parameters for the REST API call.
 * @returns {Promise<Array<{ value: number, label: string }>>} Promise resolving to an array of select options.
 */
export const loadSelectOptionsRaw = async (inputValue, postType, mapper = null, extraParams = {}) => {
    // Cancel previous request if still active
    if (controller) controller.abort();
    controller = new AbortController();

    const defaultParams = {
        per_page: -1,
        status: 'publish',
        orderby: 'title',
        order: 'asc',
    };

    const queryParams = { ...defaultParams, ...extraParams };
    const q = inputValue?.trim();
    if (q) queryParams.search = q;

    const queryString = new URLSearchParams(queryParams).toString();

    try {
        const response = await apiFetch({
            path: `/wp/v2/${postType}?${queryString}`,
            signal: controller.signal,
        });

        const list = mapper
            ? response?.map(mapper)
            : response?.map((post) => {
                const temp = document.createElement('div');
                temp.innerHTML = post?.title?.rendered;
                return {
                    value: post.id,
                    label: temp.textContent || temp.innerText || '',
                };
            });

        return Array.isArray(list) ? list : [];
    } catch (err) {
        if (err?.name === 'AbortError') return [];
        throw err;
    }
};

/**
 * Debounced, abort-safe function to fetch WordPress posts for select options.
 * Combines:
 *  - AbortController: cancels previous in-flight requests.
 *  - debounce-promise: delays execution and resolves to the final async result.
 *
 * @example
 * const options = await loadSelectOptions('John', 'team');
 */
export const loadSelectOptions = debounce(loadSelectOptionsRaw, 300, {
    leading: false,
    trailing: true,
});

/**
 * Converts a string to a URL-friendly slug.
 * @param {string} name - String to convert to slug
 * @returns {string} URL-friendly slug in lowercase with hyphens
 */
export const getSlug = (name) => slugify(name, {
    replacement: '-',
    lower: true,
    strict: true,
});

/**
 * Cleans SVG string by removing XML declaration and extra whitespace.
 * @param {string} svgString - Raw SVG string
 * @returns {string} Cleaned SVG string
 */
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

/**
 * Fetches and processes image data, handling both SVG and regular images.
 * @async
 * @param {Object} mediaData - WordPress media object
 * @param {string} mediaData.mime - Media MIME type
 * @param {string} mediaData.mime_type - Alternative MIME type property
 * @param {string} mediaData.url - Media URL
 * @param {number} mediaData.width - Image width
 * @param {number} mediaData.height - Image height
 * @returns {Promise<{isSvg: boolean, imageUrl: string|null, svgCode: string|null, width: number, height: number}>}
 */
export const getImage = async (mediaData) => {
    const SVG_MIME_TYPE = 'image/svg+xml';

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

/**
 * Formats a phone number string into XXX-XXX-XXXX format.
 * @param {string} phone - Phone number starting with '+1' followed by 10 digits
 * @returns {string} Formatted phone number or empty string if invalid
 */
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

/**
 * Generates a formatted address string from location components.
 * @param {Object} location - Location object
 * @param {string} [location.street_number] - Street number
 * @param {string} [location.street_name] - Street name
 * @param {string} [location.city] - City
 * @param {string} [location.state_short] - State abbreviation
 * @param {string} [location.post_code] - Postal code
 * @returns {string} Formatted address with HTML line breaks
 */
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

/**
 * Decodes HTML entities to their corresponding characters.
 * @param {string} text - Text containing HTML entities
 * @returns {string} Decoded text
 */
export const decodeHtmlEntities = (text) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = text;

    return tempElement.textContent || tempElement.innerText || '';
};

/**
 * Generates a string of class names for spacing based on the provided spacing object.
 *
 * @param {Object} spacing - The spacing object containing margin and padding values.
 * @param desktopPrefix - Prefix for desktop classes
 * @param mobilePrefix - Prefix for mobile classes
 * @param valuePrefix - Prefix for value
 * @returns {string} - A string of class names for the specified spacing.
 */
export const getSpacingClasses = (
    spacing,
    {
        desktopPrefix = 'md:',
        mobilePrefix = '',
        valuePrefix = '',
    } = {}
) => {
    const SKIP = -1;

    const buildClass = (prefix, property, valuePrefix, value) => {
        if (value === SKIP) return null;

        return `${prefix}${property}-${valuePrefix}${value}`;
    };

    return classNames(
        buildClass(desktopPrefix, 'mt', valuePrefix, spacing?.desktop?.margin?.top),
        buildClass(desktopPrefix, 'mb', valuePrefix, spacing?.desktop?.margin?.bottom),
        buildClass(desktopPrefix, 'pt', valuePrefix, spacing?.desktop?.padding?.top),
        buildClass(desktopPrefix, 'pb', valuePrefix, spacing?.desktop?.padding?.bottom),

        buildClass(mobilePrefix, 'mt', valuePrefix, spacing?.mobile?.margin?.top),
        buildClass(mobilePrefix, 'mb', valuePrefix, spacing?.mobile?.margin?.bottom),
        buildClass(mobilePrefix, 'pt', valuePrefix, spacing?.mobile?.padding?.top),
        buildClass(mobilePrefix, 'pb', valuePrefix, spacing?.mobile?.padding?.bottom),
    );
};

/**
 * Retrieves WordPress filters by namespace.
 * @param {string} namespace - Filter namespace to search for
 * @returns {Array<{filterName: string, namespace: string}>} Array of matching filters
 */
export const getFiltersByNamespace = (namespace) => {
    const list = [];

    Object.entries(filters).forEach(([filterName, filterData]) => {
        const handlers = filterData.handlers || [];

        handlers.forEach((handler) => {
            if (handler.namespace.startsWith(namespace)) {
                list.push({ filterName, namespace: handler.namespace });
            }
        });
    });

    return list;
};

/**
 * Allow a block for a specific post type
 * @param {string} blockName - Name of the block to unregister
 * @param {string} postType - Post type to check against
 */
export const setBlockForPostType = (blockName, postType) => {
    const unsubscribe = subscribe(
        () => {
            const currentPostType = select('core/editor').getCurrentPostType();
            if (currentPostType && currentPostType !== postType && getBlockType(blockName)) {
                unregisterBlockType(blockName);
                unsubscribe();
            }
        },
        'core/editor',
    );
};

/**
 * Disallow a block for a specific post type
 * @param {string} blockName - Name of the block to unregister
 * @param {string} postType - Post type to check against
 */
export const unsetBlockForPostType = (blockName, postType) => {
    const unsubscribe = subscribe(
        () => {
            const currentPostType = select('core/editor').getCurrentPostType();
            if (currentPostType && currentPostType === postType && getBlockType(blockName)) {
                unregisterBlockType(blockName);
                unsubscribe();
            }
        },
        'core/editor'
    );
};

/**
 * Update the API version of a specific block.
 *
 * @param {string} blockName - The name of the block to update (e.g., 'gravityforms/form').
 * @param {number} [apiVersion=3] - The API version to set for the block. Defaults to 3.
 */
export function updateBlockApiVersion(blockName, apiVersion = 3) {
    const blockSettings = getBlockType(blockName);

    if (blockSettings) {
        unregisterBlockType(blockName);

        registerBlockType(blockName, {
            ...blockSettings,
            apiVersion,
        });
    }
}

/**
 * Updates the API version of all registered blocks with an API version less than 3.
 *
 * Retrieves the list of registered blocks from the `core/blocks` store, filters out blocks
 * with an API version less than 3, and updates their API version to the specified value.
 *
 * @param {number} apiVersion - The target API version to update blocks to.
 */
export const updateAllBlocksApiVersion = (apiVersion) => {
    select('core/blocks')
        ?.getBlockTypes()
        ?.filter((block) => block.apiVersion < 3)
        ?.map((block) => block.name)
        ?.forEach((blockName) => updateBlockApiVersion(blockName, apiVersion));
};

/**
 * Creates object-position style based on focal point coordinates
 *
 * @param {Object} focalPoint - Focal point coordinates { x, y }
 * @returns {Object} Style object with objectPosition property
 */
export const getFocalPointStyle = (focalPoint) => {
    if (!focalPoint) {
        return { objectPosition: '50% 50%' };
    }

    // Handle edge case where x or y is 0
    const x = (focalPoint.x !== undefined && focalPoint.x !== null) ? focalPoint.x * 100 : 50;
    const y = (focalPoint.y !== undefined && focalPoint.y !== null) ? focalPoint.y * 100 : 50;

    return { objectPosition: `${x}% ${y}%` };
};

/**
 * Default options for Select via core-data cache
 *
 * @param {string} postType
 * @param {(post:any)=>{value:number,label:string}} [mapper]
 * @param {Object} [extraParams={}]
 *
 * @returns {{ options: Array<{value:number,label:string}>, isResolving: boolean }}
 */
export const useDefaultSelectOptions = (postType, mapper = null, extraParams = {}) => {
    const query = useMemo(() => ({
        per_page: 100,
        status: 'publish',
        order: 'asc',
        orderby: 'title',
        _fields: 'id,title,acf',
        ...extraParams,
    }), [ postType, JSON.stringify(extraParams) ]);

    return useSelect((select) => {
        const core = select('core');
        const posts = core.getEntityRecords('postType', postType, query) || [];
        const isResolving = core.isResolving('getEntityRecords', [ 'postType', postType, query ]);

        const options = mapper
            ? posts.map(mapper)
            : posts.map((post) => ({
                value: post.id,
                label: decodeHtmlEntities(post?.title?.rendered || ''),
            }));

        return {
            options,
            isResolving,
        };
    }, [ postType, JSON.stringify(query) ]);
};

export const hideBlockForInlineInserter = (blockName) => {
    const styleElementId = `ssm-hide-${blockName}-for-inline-inserter`;

    // Construct the CSS rule
    const cssRule = `[id*="-block-${blockName}"] { display: none !important; }`;

    // Create a style element
    const styleElement = document.createElement('style');
    styleElement.id = styleElementId;

    // Set the CSS rule as the content of the style element
    styleElement.appendChild(document.createTextNode(cssRule));

    // Append the style element to the document's head
    document.head.appendChild(styleElement);

    // cleanup function
    return () => {
        document.head.removeChild(styleElement);
    }
};

export const subscribeForPostTypeChange = (callback) => {
    let prevPostType = null;

    return subscribe(() => {
        const currentPostType = select('core/editor').getCurrentPostType();
        const isPostTypeChanged = currentPostType && (currentPostType !== prevPostType);

        if (isPostTypeChanged) {
            callback(currentPostType, prevPostType);

            prevPostType = currentPostType;
        }
    }, 'core/block-editor');
};
