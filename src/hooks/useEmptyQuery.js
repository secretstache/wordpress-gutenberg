import { Notice, Placeholder, Spinner } from '@wordpress/components';

export const useEmptyQuery = ({
    isLoading,
    isEmpty,
    emptyMessage,
    placeholderProps,
}) => {
    const renderEmptyResult = () => (
        <Notice status="info" isDismissible={false}>
            <p>{emptyMessage}</p>
        </Notice>
    );

    const renderPlaceholder = () => (
        <Placeholder {...placeholderProps} />
    );

    const renderLoading = () => (
        <Spinner className="bc-spinner" />
    );

    const renderQueryResult = () => {
        if (isLoading) {
            return renderLoading();
        }

        if (isEmpty) {
            return renderEmptyResult();
        }

        if (!isLoading && !isEmpty) {
            return null;
        }

        return renderPlaceholder();
    };

    return renderQueryResult;
};
