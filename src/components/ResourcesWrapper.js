import { Notice, Placeholder, Spinner } from '@wordpress/components';

const DEFAULT_EMPTY_MESSAGE = 'No resources were found matching your criteria. Please try to adjust the query.';

export const EmptyNotice = ({
    message
}) => (
    <Notice status="info" isDismissible={false}>
        <p>{message || DEFAULT_EMPTY_MESSAGE}</p>
    </Notice>
);

export const LoadingSpinner = () => <Spinner className="bc-spinner" />;

export const PlaceholderContent = ({
    icon = 'info-outline',
    instructions = 'Please configure the block in the sidebar.',
    ...restProps
}) => (
    <Placeholder
        icon={icon}
        instructions={instructions}
        {...restProps}
    />
);

export const ResourcesWrapper = ({
    isLoading,
    isEmpty,
    isPlaceholder,
    emptyMessage,
    placeholderProps = {},
    children,
}) => {
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isEmpty) {
        return <EmptyNotice message={emptyMessage} />;
    }

    if (isPlaceholder) {
        return <PlaceholderContent {...placeholderProps} />;
    }

    return children;
};
