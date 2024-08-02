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

export const mediaAttribute = {
    media: {
        type: 'object',
        default: {
            id: null,
            url: '',
            alt: '',
            filename: '',
        },
    },
};

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

export const animationAttribute = {
    animationFile: {
        type: 'object',
        default: {
            id: null,
            url: null,
            name: null,
            filename: null,
            mime: null,
        },
    },
    isAnimationLooped: {
        type: 'boolean',
        default: true,
    },
};

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
 * Returns the base background attribute object with configurable default background color and media type.
 *
 * @param {string} [defaultBackgroundMediaType=''] - The default background media type.
 * @param {Object} defaultBackgroundColor - The background color configuration.
 * @param {string} defaultBackgroundColor.value - The hex value of the background color.
 * @param {string} defaultBackgroundColor.slug - The slug of the background color.
 * @returns {Object} The base background attribute object.
 */
export const getBaseBackgroundAttributes = (
    defaultBackgroundMediaType = '',
    defaultBackgroundColor = { value: '', slug: '' },
) => {
    return {
        isIncludeBackgroundMedia: {
            type: 'boolean',
            default: false,
        },
        backgroundMediaType: {
            type: 'string',
            default: '',
        },
        backgroundColor: {
            type: 'object',
            default: defaultBackgroundColor,
        },

        ...mediaAttribute,

        isIncludeOverlay: {
            type: 'boolean',
            default: false,
        },
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
