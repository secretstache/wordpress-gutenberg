export const linkControlAttributes = {
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

export const mediaAttributes = {
    media: {
        type: 'object',
        default: {
            id: null,
            url: '',
            alt: '',
        },
    },
};

export const contentAttributes = {
    title: {
        type: 'string',
        default: 'Title',
    },
    description: {
        type: 'string',
        default: 'Description',
    },
};

export const animationAttributes = {
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

export const curatedPostsAttributes = {
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

export const numberOfPostsAttributes = {
    numberOfPosts: {
        type: 'number',
        default: 5,
    },
};

export const getDataQueryAttributes = (
    sourcesList,
    queriesList,
    hasCuratedPosts = true,
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
        ...(hasCuratedPosts ? curatedPostsAttributes : {} ),
        ...(hasNumberOfPosts ? numberOfPostsAttributes : {} ),
    };
};
