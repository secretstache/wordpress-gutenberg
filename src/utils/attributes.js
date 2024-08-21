export const linkControlAttribute = {
    linkLabel: {
        type: 'string',
        default: '',
    },
    linkSource: {
        type: 'string',
        default: '#',
    },
    linkIsOpenInNewTab: {
        type: 'boolean',
        default: false,
    },
};

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
 * @returns {Object} An object containing the attributes for the block's background configuration.
 */
export const getBaseBackgroundAttributes = ({
    hasBackgroundMedia = false,
    mediaAttributeName = 'media',
    hasOverlay = false,
} = {}) => {
    const backgroundMediaAttribute = {
        isIncludeBackgroundMedia: {
            type: 'boolean',
            default: null,
        },
        backgroundMediaType: {
            type: 'string',
            default: null,
        },
        ...getMediaAttribute(mediaAttributeName),
    };

    const overlayAttribute = {
        isIncludeOverlay: {
            type: 'boolean',
            default: null,
        },
        overlayColor: {
            type: 'object',
            default: null,
        },
    };

    return {
        backgroundColor: {
            type: 'object',
            default: null,
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
