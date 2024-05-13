import { Notice, Placeholder, Spinner } from '@wordpress/components';

const EmptyNotice = ({
    message = 'No resources were found matching your criteria. Please try to adjust the query.'
}) => (
    <Notice status="info" isDismissible={false}>
        <p>{message}</p>
    </Notice>
);

const LoadingSpinner = () => <Spinner className="bc-spinner" />;

const PlaceholderContent = ({
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
