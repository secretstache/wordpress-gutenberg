import { Notice, Placeholder, Spinner } from '@wordpress/components';

export const EmptyStateWrapper = ({
    isLoading,
    isEmpty,
    hasData,
    emptyMessage = 'No resources were found matching your criteria. Please try to adjust the query.',
    placeholderProps = {},
    children,
}) => {
    const mergedPlaceholderProps = {
        icon: 'info-outline',
        instructions: 'Please configure the block in the sidebar.',
        ...placeholderProps,
    };

    const renderEmptyResult = () => (
        <Notice status="info" isDismissible={false}>
            <p>{emptyMessage}</p>
        </Notice>
    );

    const renderPlaceholder = () => <Placeholder {...mergedPlaceholderProps} />;

    const renderLoading = () => <Spinner className="bc-spinner" />;

    if (isLoading) {
        return renderLoading();
    }

    if (isEmpty) {
        return renderEmptyResult();
    }

    if (!hasData) {
        return renderPlaceholder();
    }

    return children;
};
