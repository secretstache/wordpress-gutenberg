import apiFetch from '@wordpress/api-fetch';
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

export const decodeHtmlEntities = (text) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = text;

    return tempElement.textContent || tempElement.innerText || '';
};
