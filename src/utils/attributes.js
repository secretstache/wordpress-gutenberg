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
}

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
