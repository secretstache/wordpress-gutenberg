import { filters } from '@wordpress/hooks';
import apiFetch from '@wordpress/api-fetch';
import slugify from 'slugify';
import classNames from 'classnames';
import { select, subscribe } from '@wordpress/data';
import { getBlockType, registerBlockType, unregisterBlockType } from '@wordpress/blocks';

/**
 * Loads select options by fetching posts from WordPress REST API.
 * @async
 * @param {string} inputValue - Search term to filter posts
 * @param {string} postType - WordPress post type to query
 * @param {Function|null} [mapper=null] - Optional function to transform API response items
 * @param {Object} [extraParams={}] - Additional query parameters
 * @returns {Promise<Array<{value: number, label: string}>>} Array of select options
 */
export const loadSelectOptions = async (inputValue, postType, mapper = null, extraParams = {}) => {
     const defaultParams = {
        per_page: -1,
        status: 'publish',
        orderby: 'title',
        order: 'asc'
    };

    const queryParams = { ...defaultParams, ...extraParams };

    if (inputValue && inputValue.trim()) {
        queryParams.search = inputValue;
    }

    const queryString = new URLSearchParams(queryParams).toString();

    const response = await apiFetch({
        path: `/wp/v2/${postType}?${queryString}`,
    });

    if (mapper) {
        return response?.map(mapper);
    } else {
        return response?.map((post) => {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = post?.title?.rendered;

            return {
                value: post.id,
                label: tempElement.textContent || tempElement.innerText || '',
            };
        });
    }
};

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
 * @returns {string} - A string of class names for the specified spacing.
 */
export const getSpacingClasses = (
    spacing,
    desktopPrefix = 'md:',
    mobilePrefix = '',
) => {
    return classNames({
        [`${desktopPrefix}mt-${spacing?.desktop?.margin?.top}`]: spacing?.desktop?.margin?.top !== -1,
        [`${desktopPrefix}mb-${spacing?.desktop?.margin?.bottom}`]: spacing?.desktop?.margin?.bottom !== -1,

        [`${desktopPrefix}pt-${spacing?.desktop?.padding?.top}`]: spacing?.desktop?.padding?.top !== -1,
        [`${desktopPrefix}pb-${spacing?.desktop?.padding?.bottom}`]: spacing?.desktop?.padding?.bottom !== -1,

        [`${mobilePrefix}mt-${spacing?.mobile?.margin?.top}`]: spacing?.mobile?.margin?.top !== -1,
        [`${mobilePrefix}mb-${spacing?.mobile?.margin?.bottom}`]: spacing?.mobile?.margin?.bottom !== -1,

        [`${mobilePrefix}pt-${spacing?.mobile?.padding?.top}`]: spacing?.mobile?.padding?.top !== -1,
        [`${mobilePrefix}pb-${spacing?.mobile?.padding?.bottom}`]: spacing?.mobile?.padding?.bottom !== -1,
    });
};

/**
 * Retrieves WordPress filters by namespace.
 * @param {string} namespace - Filter namespace to search for
 * @returns {Array<{filterName: string, namespace: string}>} Array of matching filters
 */
const getFiltersByNamespace = (namespace) => {
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
 * Unregisters a block type for a specific post type when editor loads.
 * @param {string} blockName - Name of the block to unregister
 * @param {string} postType - Post type to check against
 */
const unsetBlockForPostType = (blockName, postType) => {
    const unsubscribe = subscribe(
        () => {
            const currentPostType = select('core/editor').getCurrentPostType();
            if (currentPostType === postType && getBlockType(blockName)) {
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

