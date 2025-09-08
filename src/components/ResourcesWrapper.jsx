import { Notice, Placeholder, Spinner } from '@wordpress/components';

const DEFAULT_EMPTY_RESOURCES_MESSAGE = 'No resources were found matching your criteria. Please try to adjust the query.';
const DEFAULT_EMPTY_SELECTION_MESSAGE = 'No items are selected. Please use the corresponding relationship field to populate this block.';

export const EmptyNotice = ({ message }) => (
    <Notice status="info" isDismissible={false}>
        <p>{message}</p>
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
    isEmptyResources,
    isEmptySelection,
    isPlaceholder,
    emptyResourcesMessage,
    emptySelectionMessage,
    placeholderProps = {},
    children,
}) => {
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isEmptySelection) {
        return <EmptyNotice message={emptySelectionMessage || DEFAULT_EMPTY_SELECTION_MESSAGE} />;
    }

    if (isEmptyResources) {
        return <EmptyNotice message={emptyResourcesMessage || DEFAULT_EMPTY_RESOURCES_MESSAGE} />;
    }

    if (isPlaceholder) {
        return <PlaceholderContent {...placeholderProps} />;
    }

    return children;
};
