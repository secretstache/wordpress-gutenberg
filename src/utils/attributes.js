/**
 * @deprecated since 0.4.9
 * @type {{linkLabel: {default: string, type: string}, linkIsOpenInNewTab: {default: boolean, type: string}, linkSource: {default: string, type: string}}}
 */
export const linkControlAttribute = {
    linkLabel: {
        type: 'string',
        default: '',
    },
    linkSource: {
        type: 'string',
        default: '',
    },
    linkIsOpenInNewTab: {
        type: 'boolean',
        default: false,
    },
};

/**
 * @param name
 * @returns {{[p: string]: {default: {filename: null, mime: null, alt: null, name: null, id: null, url: null}, type: string}}}
 */
export const getMediaAttribute = (name = 'media') => ({
    [`${name}`]: {
        type: 'object',
        default: {
            id: null,
            url: null,
            alt: null,
            name: null,
            filename: null,
            mime: null,
        },
    },
});

/**
 * @deprecated since 0.4.9
 * @type {{description: {default: string, type: string}, title: {default: string, type: string}}}
 */
export const contentAttribute = {
    title: {
        type: 'string',
        default: 'Title',
    },
    description: {
        type: 'string',
        default: 'Description',
    },
};

/**
 * @param name
 * @returns {{[p: string]: {default: {filename: null, mime: null, alt: null, name: null, id: null, url: null}, type: string}, isAnimationLooped: {default: boolean, type: string}}}
 */
export const getAnimationAttribute = (name = 'animationFile') => ({
    ...getMediaAttribute(name),
    isAnimationLooped: {
        type: 'boolean',
        default: true,
    },
});

export const curatedPostsAttribute = {
    curatedPosts: {
        type: 'array',
        default: [],
        items: {
            type: 'object',
            properties: {
                value: {
                    type: 'number'
                },
                label: {
                    type: 'string'
                }
            }
        }
    }
};

export const curatedCategoriesAttribute = {
    curatedCategories: {
        type: 'array',
        default: [],
        items: {
            type: 'object',
            properties: {
                value: {
                    type: 'number'
                },
                label: {
                    type: 'string'
                }
            }
        }
    }
};

export const numberOfPostsAttribute = {
    numberOfPosts: {
        type: 'number',
        default: 5,
    },
};

// TODO: make dataSource optional, rebuild it's not easy to use(need to pass sourcesList and queriesList in complex format)
export const getDataQueryAttributes = (
    sourcesList,
    queriesList,
    hasCuratedPosts = true,
    hasCuratedCategories = false,
    hasNumberOfPosts = false,
) => {
    let dataSourceConfig = {
        type: 'string'
    };

    if (sourcesList && sourcesList?.length > 0) {
        dataSourceConfig.enum = sourcesList;
        dataSourceConfig.default = sourcesList[0].value;
    }

    let queryTypeConfig = {
        type: 'string'
    };

    if (queriesList && queriesList?.length > 0) {
        queryTypeConfig.enum = [
            ...queriesList
        ];
        queryTypeConfig.default = queriesList[0].value;
    }

    return {
        dataSource: dataSourceConfig,
        queryType: queryTypeConfig,
        ...(hasCuratedPosts ? curatedPostsAttribute : {}),
        ...(hasCuratedCategories ? curatedCategoriesAttribute : {}),
        ...(hasNumberOfPosts ? numberOfPostsAttribute : {}),
    };
};
/**
 * Generates a set of attributes for background settings in a block, including options
 * for background color, media, and overlays based on the provided configurations.
 *
 * @param {Object} [options={}] - The options for generating background attributes.
 * @param {boolean} [options.hasBackgroundMedia=false] - Flag to determine if background media attributes should be included.
 * @param {string} [options.mediaAttributeName='media'] - Background media attribute name.
 * @param {boolean} [options.hasOverlay=false] - Flag to determine if overlay attributes should be included.
 *
 * @returns {{[p: string]: {default: {filename: null, mime: null, alt: null, name: null, id: null, url: null}, type: string}, backgroundMediaType?: {type: string}, backgroundColor: {type: string}, isIncludeBackgroundMedia?: {type: string}, isIncludeOverlay?: {type: string}, overlayColor?: {type: string}}}
 */
export const getBaseBackgroundAttributes = ({
    hasBackgroundMedia = false,
    mediaAttributeName = 'media',
    hasOverlay = false,
} = {}) => {
    const backgroundMediaAttribute = {
        isIncludeBackgroundMedia: {
            type: 'boolean',
        },
        backgroundMediaType: {
            type: 'string',
        },
        ...getMediaAttribute(mediaAttributeName),
    };

    const overlayAttribute = {
        isIncludeOverlay: {
            type: 'boolean',
        },
        overlayColor: {
            type: 'object',
        },
    };

    return {
        backgroundColor: {
            type: 'object',
        },

        ...(hasBackgroundMedia ? backgroundMediaAttribute : {}),

        ...(hasOverlay ? overlayAttribute : {}),
    };
};

export const spacingAttribute = {
    spacing: {
        type: 'object',
        default: {
            margin: {
                top: -1,
                bottom: -1,
            },
            padding: {
                top: -1,
                bottom: -1,
            }
        },
    },
}

export const responsiveSpacingAttribute = {
    spacing: {
        type: 'object',
        default: {
            desktop: {
                margin: {
                    top: -1,
                    bottom: -1,
                },
                padding: {
                    top: -1,
                    bottom: -1,
                }
            },
            mobile: {
                margin: {
                    top: -1,
                    bottom: -1,
                },
                padding: {
                    top: -1,
                    bottom: -1,
                }
            }
        }
    }
}

/**
 * @since 0.4.9
 * @param prefix
 * @returns {{[p: string]: {default: string, type: string}|{default: string, type: string}|{default: boolean, type: string}}}
 */
export const getLinkAttributes = (prefix = 'link') => ({
    [`${prefix}Label`]: {
        type: 'string',
        default: '',
    },
    [`${prefix}Source`]: {
        type: 'string',
        default: '',
    },
    [`${prefix}IsOpenInNewTab`]: {
        type: 'boolean',
        default: false,
    },
});
