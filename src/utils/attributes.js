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
        dataSourceConfig.default = sourcesList[0];
    }

    let queryTypeConfig = {
        type: 'string'
    };

    if (queriesList && queriesList?.length > 0) {
        queryTypeConfig.enum = [
            ...queriesList
        ];
        queryTypeConfig.default = queriesList[0];
    }

    return {
        dataSource: dataSourceConfig,
        queryType: queryTypeConfig,
        ...(hasCuratedPosts ? curatedPostsAttribute : {}),
        ...(hasCuratedCategories ? curatedCategoriesAttribute : {}),
        ...(hasNumberOfPosts ? numberOfPostsAttribute : {}),
    };
};

export const baseBackgroundAttribute = {
    isIncludeBackgroundMedia: {
        type: 'boolean',
        default: false,
    },
    backgroundMediaType: {
        type: 'string',
        default: 'color',
    },
    backgroundColor: {
        type: 'object',
        default: {
            value: '#ffffff',
            slug: 'white',
        },
    },
    backgroundImage: {
        type: 'object',
        default: {
            id: null,
            url: '',
        },
    },
    backgroundVideo: {
        type: 'object',
        default: {
            id: null,
            url: '',
        },
    },
    isIncludeOverlay: {
        type: 'boolean',
        default: false,
    },
}
