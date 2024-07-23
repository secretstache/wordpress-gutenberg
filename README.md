# Documentation

## Components

  - [ColorPaletteControl](#colorpalettecontrol)
  - [DataQueryControls and useDataQuery](#dataquerycontrols-and-usedataquery)
  - [DividersControl](#dividerscontrol)
  - [IconPicker](#iconpicker)
  - [LinkControl](#linkcontrol)
  - [MediaControl](#mediacontrol)
    - [Image](#image)
    - [Video](#video)
    - [Animation](#animation)
  - [MediaTypeControl](#mediatypecontrol)
  - [ResourcesWrapper](#resourceswrapper)
  - [SortableSelectAsync](#sortableselectasync)

## Hooks

---

# ColorPaletteControl

A versatile color selection component for Gutenberg blocks, allowing users to choose between theme colors and custom colors.

## Usage

```jsx
import { ColorPaletteControl, getBackgroundColorClass } from '@secretstache/wordpress-gutenberg';

export const edit = ({ attributes, setAttributes }) => {
    const { backgroundColor } = attributes;

    return (
        <InspectorControls>

            {/* code */}

                <ColorPaletteControl
                    label="Background Color"
                    value={backgroundColor?.value}
                    attributeName="backgroundColor"
                    setAttributes={setAttributes}
                    allowedColors={['red', 'blue', 'green']}
                />

            {/* code */}

        </InspectorControls>
    );
};

// In edit function
const blockProps = useBlockProps({
    className: getBackgroundColorClass(backgroundColor),
    style: backgroundColor?.slug === 'custom' 
        ? { backgroundColor: backgroundColor.value } 
        : {}
});

// In save function
const blockProps = useBlockProps.save({
    className: getBackgroundColorClass(backgroundColor)
});
const style = backgroundColor?.slug === 'custom' 
    ? { backgroundColor: backgroundColor.value } 
    : {};
```

### Parameters

| Parameter       | Type          | Description                                                                                     |
|-----------------|---------------|-------------------------------------------------------------------------------------------------|
| `label`         | String        | Control label (default: "Color")                                                                |
| `value`         | String        | Current color value                                                                             |
| `attributeName` | String        | Attribute name for storing color                                                                |
| `setAttributes` | Function      | Function to update block attributes                                                             |
| `allowedColors` | Array[String] | Limits theme color choices (optional). If not provided or empty, all colors from theme.json will be displayed. |


### Additional Exports

* `useThemeColors`: Hook to get theme colors
* `useColorChange`: Hook to handle color changes
* `getBackgroundColorClass`: Function to generate background color class

---

# DataQueryControls and useDataQuery

Flexible components for managing data sources and query types in Gutenberg blocks, allowing users to select and retrieve data from various sources with customizable query parameters.

## Usage

```jsx
import { DataQueryControls, useDataQuery, QUERY_TYPES } from '@secretstache/wordpress-gutenberg';

export const edit = ({ attributes, setAttributes }) => {
    const { dataSource, queryType, curatedPosts, curatedCategories, numberOfPosts } = attributes;

    const {
        postsToShow,
        isLoading,
    } = useDataQuery({
        getPostType: () => 'post',
        queryType,
        curatedPostsIds: curatedPosts.map((post) => post.value),
        categoriesTaxonomy: 'category',
        curatedCategoriesIds: curatedCategories.map((category) => category.value),
        numberOfPosts,
        extraQueryArgs: { status: 'publish' },
        dependencies: [dataSource, queryType, curatedPosts, curatedCategories, numberOfPosts],
    });

    return (
        <InspectorControls>

            {/* code */}

                <DataQueryControls
                    dataSourceLabel="Select Data Source"
                    dataSource={dataSource}
                    onDataSourceChange={(dataSource) => setAttributes({ dataSource })}
                    queryTypeLabel="Select Query Type"
                    queryType={queryType}
                    onQueryTypeChange={(queryType) => setAttributes({ queryType })}
                    settings={[
                        { label: 'Posts', value: 'posts', queries: [
                            { label: 'Latest', value: QUERY_TYPES.LATEST },
                            { label: 'Curated', value: QUERY_TYPES.CURATED },
                            { label: 'By Category', value: QUERY_TYPES.BY_CATEGORY },
                        ]},
                        { label: 'Pages', value: 'pages', queries: [
                            { label: 'All', value: QUERY_TYPES.LATEST },
                            { label: 'Selected', value: QUERY_TYPES.CURATED },
                        ]},
                    ]}
                />

            {/* code */}

        </InspectorControls>
    );
};
```

### Parameters

| Parameter           | Type          | Description                                                                                      |
|---------------------|---------------|--------------------------------------------------------------------------------------------------|
| `dataSourceLabel`   | String        | Label for data source selection (default: "Data Source")                                         |
| `dataSource`        | String        | Current selected data source                                                                     |
| `onDataSourceChange`| Function      | Called when data source changes                                                                  |
| `queryTypeLabel`    | String        | Label for query type selection (default: "Query")                                                |
| `queryType`         | String        | Current selected query type                                                                      |
| `onQueryTypeChange` | Function      | Called when query type changes                                                                   |
| `settings`          | Array[Object] | Defines available data sources and their corresponding query types                               |

### Settings Object Structure

```jsx
{
    label: String, // Display label for the data source
    value: String, // Unique identifier for the data source
    queries: [     // Array of available query types for this data source
        {
            label: String, // Display label for the query type
            value: String, // Unique identifier for the query type
        },
        // ... more query types
    ]
}
```

---

## useDataQuery

Hook for executing data queries based on selected parameters.

### Parameters

| Parameter            | Type          | Description                                                                                                    |
|----------------------|---------------|----------------------------------------------------------------------------------------------------------------|
| `getPostType`        | Function      | Function returning the post type for the query                                                                 |
| `queryType`          | String        | Type of query (e.g., QUERY_TYPES.CURATED, QUERY_TYPES.LATEST, QUERY_TYPES.BY_CATEGORY)                         |
| `curatedPostsIds`    | Array         | Array of IDs for curated posts (used if `queryType === QUERY_TYPES.CURATED`)                                   |
| `categoriesTaxonomy` | String        | Name of the category taxonomy (used if `queryType === QUERY_TYPES.BY_CATEGORY`)                                |
| `curatedCategoriesIds`| Array        | Array of category IDs (used if `queryType === QUERY_TYPES.BY_CATEGORY`)                                        |
| `numberOfPosts`      | Number        | Number of posts to query (default: -1, all posts)                                                              |
| `extraQueryArgs`     | Object        | Additional query arguments to be passed to the WordPress API                                                   |
| `dependencies`       | Array         | Array of dependencies for re-running the query                                                                 |


### Return Values

* `postsToShow`: Array of retrieved posts
* `isLoading`: Boolean indicating if data is loading

### Additional Exports

* `QUERY_TYPES`: Object with query type constants
  * `LATEST`: For retrieving the latest posts
  * `CURATED`: For retrieving specific curated posts
  * `BY_CATEGORY`: For retrieving posts from specific categories

### Notes

* When using `QUERY_TYPES.BY_CATEGORY`, make sure to provide both `categoriesTaxonomy` and `curatedCategoriesIds`.
* The component and hook are designed to work together but can also be used independently if needed.

---

# DividersControl

A flexible component for managing top and bottom dividers, as well as an optional vertical line in Gutenberg blocks.

## Usage

```jsx
import { DividersControl } from '@secretstache/wordpress-gutenberg';

export const edit = ({ attributes, setAttributes }) => {
    const { dividers } = attributes;

    return (
        <InspectorControls>
            <PanelBody title="Divider Settings">
                <DividersControl
                    topDividers={[
                        { label: 'Wave', value: 'wave' },
                        { label: 'Triangle', value: 'triangle' },
                    ]}
                    bottomDividers={[
                        { label: 'Curve', value: 'curve' },
                        { label: 'Slant', value: 'slant' },
                    ]}
                    value={dividers}
                    onChange={(newDividers) => setAttributes({ dividers: newDividers })}
                />
            </PanelBody>
        </InspectorControls>
    );
};
```

### Parameters

| Parameter        | Type          | Description                                                                                               |
|------------------|---------------|-----------------------------------------------------------------------------------------------------------|
| `topDividers`    | Array[Object] | Defines available top divider options                                                                     |
| `bottomDividers` | Array[Object] | Defines available bottom divider options                                                                  |
| `value`          | Object        | Current divider settings (default: `{ topDivider: '', bottomDivider: '', isIncludeLine: false }`)         |
| `hasLine`        | Boolean       | Whether to include the vertical line option (default: true)                                               |
| `onChange`       | Function      | Called when divider settings change                                                                       |


### Return Value

The component returns an object with the following properties:

* `topDivider`: String, selected top divider value
* `bottomDivider`: String, selected bottom divider value
* `isIncludeLine`: Boolean, whether to include the vertical line

### Notes

The `DividersControl` component provides a user-friendly interface for selecting top and bottom dividers, as well as an option to include a vertical line. It's designed to work seamlessly within Gutenberg block settings.

---

# IconPicker

A versatile component for selecting and managing icon images in Gutenberg blocks, supporting both regular images and SVG files.

## Usage

```jsx
import { IconPicker, cleanSvgString } from '@secretstache/wordpress-gutenberg';

export const edit = ({ attributes, setAttributes }) => {
  const { imageId, imageUrl, imageAlt, svgCode } = attributes;

    const onRemoveImage = () => setAttributes({
        imageId: null,
        imageUrl: '',
        imageAlt: '',
        svgCode: '',
    });

    const onSelectImage = (media) => {
        const newAttributes = {
            imageId: media.id,
            imageUrl: media.url,
            imageAlt: media.alt,
        };

        if (media.mime === 'image/svg+xml') {
            fetch(media.url)
                .then(response => response.text())
                .then(svgString => {
                    const cleanedSvgString = cleanSvgString(svgString);
                    setAttributes({ ...newAttributes, svgCode: cleanedSvgString });
                });
        } else {
            setAttributes({ ...newAttributes, svgCode: '' });
        }
    };

    return (
        <IconPicker
            imageId={imageId}
            imageUrl={imageUrl}
            imageAlt={imageAlt}
            svgCode={svgCode}
            onSelect={onSelectImage}
            onRemove={onRemoveImage}
        />
    );
};
```

### Parameters

| Parameter  | Type     | Description                                    |
|------------|----------|------------------------------------------------|
| `imageId`  | Number   | ID of the selected image                       |
| `imageUrl` | String   | URL of the selected image                      |
| `imageAlt` | String   | Alt text for the selected image                |
| `svgCode`  | String   | SVG code if the selected image is an SVG file  |
| `onSelect` | Function | Called when an image is selected               |
| `onRemove` | Function | Called when the image is removed               |


### Features

* Supports both regular images and SVG files
* Provides a media placeholder when no image is selected
* Displays a preview of the selected image or SVG
* Offers options to replace or remove the selected image
* Uses WordPress components for consistent UI and functionality

### Notes

The `IconPicker` component provides a user-friendly interface for selecting and managing icon images within Gutenberg blocks. It integrates seamlessly with the WordPress media library and handles both regular images and SVG files.

---

# LinkControl

A comprehensive component for managing link attributes in Gutenberg blocks, including URL input and the option to open links in a new tab.

## Usage

```jsx
import { LinkControl } from '@secretstache/wordpress-gutenberg';

export const edit = ({ attributes, setAttributes }) => {
    const { linkSource, linkIsOpenInNewTab } = attributes;

    return (
        <InspectorControls>
            <PanelBody title="Link Settings">
                <LinkControl
                    url={{
                        value: linkSource,
                        attrName: 'linkSource',
                    }}
                    isOpenInNewTab={{
                        value: linkIsOpenInNewTab,
                        attrName: 'linkIsOpenInNewTab',
                    }}
                    setAttributes={setAttributes}
                    label="Button Source"
                />
            </PanelBody>
        </InspectorControls>
    );
};
```

### Parameters

| Parameter         | Type     | Description                                                                                   |
|-------------------|----------|-----------------------------------------------------------------------------------------------|
| `url`             | Object   | Contains the URL value and attribute name                                                     |
| `url.value`       | String   | The current URL value (default: '#')                                                          |
| `url.attrName`    | String   | The attribute name for storing the URL (default: 'linkSource')                                |
| `isOpenInNewTab`  | Object   | Contains the "open in new tab" value and attribute name                                       |
| `isOpenInNewTab.value` | Boolean  | Whether the link should open in a new tab (default: false)                                      |
| `isOpenInNewTab.attrName` | String  | The attribute name for storing the "open in new tab" setting (default: 'linkIsOpenInNewTab')         |
| `setAttributes`   | Function | Used to update block attributes                                                               |
| `label`           | String   | Label for the URL input field (default: 'Source')                                             |

### Features

* Provides a URL input field using the WordPress URLInput component
* Includes a checkbox for setting whether the link should open in a new tab
* Uses WordPress components for consistent UI and functionality
* Integrates with block attributes for easy state management

### Notes

The `LinkControl` component simplifies the process of adding and managing links within Gutenberg blocks. It handles both the URL input and the "open in new tab" option, providing a complete solution for link management.

---

# MediaControl

A versatile component for selecting and managing various types of media (images, videos, and animation files) in Gutenberg blocks.

## Usage

## Image

```jsx
import { MediaControl, MEDIA_TYPES } from '@secretstache/wordpress-gutenberg';

export const edit = ({ attributes, setAttributes }) => {
    const { backgroundImage } = attributes;

    const handleSelectImage = (media) => {
        setAttributes({
            backgroundImage: {
                id: media.id,
                url: media.url,
            },
        });
    };

    const handleRemoveImage = () => {
        setAttributes({
            backgroundImage: {},
        });
    };

    return (
        <MediaControl
            mediaId={backgroundImage?.id}
            mediaUrl={backgroundImage?.url}
            onSelect={handleSelectImage}
            onRemove={handleRemoveImage}
            type={MEDIA_TYPES.IMAGE}
            selectButtonLabel="Select Background Image"
            removeButtonLabel="Remove Background Image"
        />
    );
};
```

## Video

```jsx
import { MediaControl, MEDIA_TYPES } from '@secretstache/wordpress-gutenberg';

export const edit = ({ attributes, setAttributes }) => {
    const { backgroundVideo } = attributes;

    const handleSelectVideo = (media) => {
        setAttributes({
            backgroundVideo: {
                id: media.id,
                url: media.url,
            },
        });
    };

    const handleRemoveVideo = () => {
        setAttributes({
            backgroundVideo: {},
        });
    };

    return (
        <MediaControl
            mediaId={backgroundVideo?.id}
            mediaUrl={backgroundVideo?.url}
            onSelect={handleSelectVideo}
            onRemove={handleRemoveVideo}
            type={MEDIA_TYPES.VIDEO}
            selectButtonLabel="Select Background Video"
            removeButtonLabel="Remove Background Video"
        />
    );
};
```

## Animation

```jsx
import { MediaControl, MEDIA_TYPES } from '@secretstache/wordpress-gutenberg';

export const edit = ({ attributes, setAttributes }) => {
    const { animationFile } = attributes;

    const handleSelectAnimation = (media) => {
        setAttributes({
            animationFile: {
                id: media.id,
                url: media.url,
                filename: media.filename,
            },
        });
    };

    const handleRemoveAnimation = () => {
        setAttributes({
            animationFile: {},
        });
    };

    return (
        <MediaControl
            mediaId={animationFile?.id}
            mediaUrl={animationFile?.url}
            mediaFileName={animationFile?.filename}
            onSelect={handleSelectAnimation}
            onRemove={handleRemoveAnimation}
            type={MEDIA_TYPES.ANIMATION}
            selectButtonLabel="Select Animation File"
            removeButtonLabel="Remove Animation File"
        />
    );
};
```

### Parameters

| Parameter           | Type     | Description                                                                 |
|---------------------|----------|-----------------------------------------------------------------------------|
| `mediaId`           | Number   | ID of the selected media                                                    |
| `mediaUrl`          | String   | URL of the selected media                                                   |
| `mediaFileName`     | String   | Filename of the selected media (used for animation files)                   |
| `onSelect`          | Function | Called when media is selected                                               |
| `onRemove`          | Function | Called when media is removed                                                |
| `type`              | String   | Type of media to handle (`MEDIA_TYPES.IMAGE`, `MEDIA_TYPES.VIDEO`, or `MEDIA_TYPES.ANIMATION`) |
| `selectButtonLabel` | String   | Custom label for the select button                                          |
| `removeButtonLabel` | String   | Custom label for the remove button                                          |
| `...other`          | Object   | Additional props passed to the `MediaUpload` component                      |


### Features

* Supports three types of media: images, videos, and animation files
* Provides appropriate UI for each media type:
  * **Images**: displays the image with options to replace or remove
  * **Videos**: displays a video player with options to replace or remove
  * **Animation files**: displays the filename with options to replace or remove
* Uses WordPress components for consistent UI and functionality
* Integrates seamlessly with the WordPress media library
* Allows customization of button labels

### Subcomponents

* **ImageRenderer**
  * Renders the UI for image selection and management.
* **VideoRenderer**
  * Renders the UI for video selection and management.
* **AnimationRenderer**
  * Renders the UI for animation file selection and management.

### Notes

The `MediaControl` component provides a flexible solution for handling various types of media within Gutenberg blocks. It adapts its UI based on the specified media type, offering a consistent experience for managing different media assets. The component also allows for customization of button labels to fit specific use cases.

---

# MediaTypeControl

A versatile component for selecting media types and managing media in Gutenberg blocks, supporting multiple media types.

## Usage

```jsx
import { MediaTypeControl, MEDIA_TYPES } from '@secretstache/wordpress-gutenberg';

export const edit = ({ attributes, setAttributes }) => {
    const { mediaId, mediaUrl, mediaFileName, mediaType } = attributes;

    const handleSelectMedia = (media) => {
        setAttributes({
            mediaId: media.id,
            mediaUrl: media.url,
            mediaFileName: media.filename,
            mediaType: media.type,
        });
    };

    const handleRemoveMedia = () => {
        setAttributes({
            mediaId: null,
            mediaUrl: null,
            mediaFileName: null,
            mediaType: null,
        });
    };

    return (
        <MediaTypeControl
            mediaTypes={[MEDIA_TYPES.IMAGE, MEDIA_TYPES.VIDEO, MEDIA_TYPES.ANIMATION]}
            mediaId={mediaId}
            mediaUrl={mediaUrl}
            mediaFileName={mediaFileName}
            mediaOnSelect={handleSelectMedia}
            mediaOnRemove={handleRemoveMedia}
        />
    );
};
```

### Parameters

| Parameter           | Type          | Description                                                                 |
|---------------------|---------------|-----------------------------------------------------------------------------|
| `mediaTypes`        | Array         | Array of `MEDIA_TYPES`, defines available media type options                 |
| `mediaId`           | Number        | ID of the selected media                                                    |
| `mediaUrl`          | String        | URL of the selected media                                                   |
| `mediaFileName`     | String        | Filename of the selected media (used for animation files)                   |
| `mediaOnSelect`     | Function      | Called when media is selected                                               |
| `mediaOnRemove`     | Function      | Called when media is removed                                                |

### Features

* Allows selection of media type from provided options
* Dynamically renders appropriate `BCMediaPicker` based on selected media type
* Supports multiple media types (Image, Video, Animation)
* Uses WordPress components for consistent UI and functionality
* Integrates seamlessly with the WordPress media library

### Notes

The `MediaTypeControl` component provides a flexible solution for handling various types of media within Gutenberg blocks. It combines media type selection with media management, offering a comprehensive interface for working with different media assets.

---

# ResourcesWrapper

A flexible component for handling different states of resource loading and display in Gutenberg blocks.

## Usage

```jsx
import { ResourcesWrapper, useDataQuery, QUERY_TYPES } from '@secretstache/wordpress-gutenberg';

export const edit = ({ attributes }) => {
    const { queryType, curatedPostsIds, numberOfPosts } = attributes;

    const {
        postsToShow,
        isLoading,
    } = useDataQuery({
        getPostType: () => 'post',
        queryType,
        curatedPostsIds,
        numberOfPosts: queryType === QUERY_TYPES.CURATED ? -1 : numberOfPosts,
        dependencies: [queryType, curatedPostsIds, numberOfPosts],
    });

    const isEmpty = !isLoading && postsToShow?.length === 0;
    const isPlaceholder = !queryType;

    return (
        <ResourcesWrapper
            isLoading={isLoading}
            isEmpty={isEmpty}
            isPlaceholder={isPlaceholder}
            emptyMessage="No posts found. Try adjusting your query settings."
            placeholderProps={{
                icon: 'admin-post',
                instructions: 'Configure your post query in the sidebar.',
                label: 'Posts Block'
            }}
        >
            {postsToShow?.map((post) => (
                <div key={post.id}>{post.title.rendered}</div>
            ))}
        </ResourcesWrapper>
    );
};
```

### Parameters

| Parameter         | Type     | Description                                                                  |
|-------------------|----------|------------------------------------------------------------------------------|
| `isLoading`       | Boolean  | Indicates if resources are currently being loaded                            |
| `isEmpty`         | Boolean  | Indicates if no resources were found                                         |
| `isPlaceholder`   | Boolean  | Indicates if the block should display a placeholder (e.g., when not configured) |
| `emptyMessage`    | String   | Custom message to display when no resources are found                        |
| `placeholderProps`| Object   | Props to pass to the `Placeholder` component                                 |
| `children`        | ReactNode| React nodes to render when resources are available                           |

### Features

* Handles multiple states of resource loading and display:
  * **Loading state** with a spinner
  * **Empty state** with a customizable message
  * **Placeholder state** for unconfigured blocks
  * **Content state** for displaying loaded resources
* Uses WordPress components for consistent UI
* Customizable messages and placeholder content

### Subcomponents

* **EmptyNotice**
  * Displays a notice when no resources are found.
* **LoadingSpinner**
  * Shows a spinner during the loading state.
* **PlaceholderContent**
  * Renders a placeholder with customizable content when the block is not configured.

### Notes

The `ResourcesWrapper` component provides a comprehensive solution for handling various states in resource-dependent Gutenberg blocks. It improves user experience by clearly communicating the current state of the block and guiding users through the configuration process.

---

# SortableSelectAsync

A customizable React component that combines the functionality of react-select/async with react-sortable-hoc to create a sortable multi-select dropdown with asynchronous option loading.

## Usage

```jsx
import {
  ResourcesWrapper,
  useDataQuery,
  QUERY_TYPES,
  prepareTextWithCodedSymbols
} from '@secretstache/wordpress-gutenberg';

export const edit = ({ attributes, setAttributes }) => {
    const { curatedPosts } = attributes;

    const loadOptions = (inputValue) => {
        return loadSelectOptions(inputValue, 'post_type', (post) => ({
            value: post.id,
            label: prepareTextWithCodedSymbols(post?.title?.rendered),
        }));
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newCuratedPosts = arrayMove(curatedPosts, oldIndex, newIndex);
        setAttributes({ curatedPosts: newCuratedPosts });
    };

    return (
        <SortableSelectAsync
            placeholder="Items to show"
            loadOptions={loadOptions}
            value={curatedPosts}
            onChange={(curatedPosts) => setAttributes({ curatedPosts })}
            onSortEnd={onSortEnd}
        />
    );
};
```

### Parameters

| Parameter     | Type     | Description                                                        |
|---------------|----------|--------------------------------------------------------------------|
| `placeholder` | String   | Placeholder text for the select input                              |
| `loadOptions` | Function | Asynchronous function to load options based on input               |
| `value`       | Array    | Currently selected options                                         |
| `onChange`    | Function | Callback when selected options change                              |
| `onSortEnd`   | Function | Callback when the order of selected options changes                |


### Features

* Asynchronous option loading
* Multi-select functionality
* Drag-and-drop sorting of selected items
* Integration with WordPress block editor attributes
* Customizable placeholder text

### Notes

* This component is part of the `@secretstache/wordpress-gutenberg` package and is designed to work seamlessly with WordPress Gutenberg blocks. It's particularly useful for creating curated lists of posts or custom post types within block editor settings.
* The component relies on external utilities like `loadSelectOptions` for fetching options and `arrayMove` from 'react-sortable-hoc' for handling the sorting functionality.
* When used in WordPress blocks, it's typically placed within the `InspectorControls` component to appear in the block's sidebar settings.

---

# Hooks

---

# useAllowedBlocks

A hook for filtering allowed blocks based on a parent block name and a list of excluded blocks.

## Usage

```jsx
import { useAllowedBlocks } from '@secretstache/wordpress-gutenberg';

export const edit = ({ attributes, setAttributes }) => {
    const allowedBlocks = useAllowedBlocks('core/group', ['core/paragraph']);

    return (
        <InnerBlocks
            allowedBlocks={allowedBlocks}
        />
    );
};
```

### Parameters

| Parameter       | Type     | Description                                       |
|-----------------|----------|---------------------------------------------------|
| `blockName`     | String   | The name of the parent block                      |
| `excludedBlocks`| Array    | An array of block names to exclude                |

### Features

- Filters blocks based on the parent block
- Excludes specified blocks from the allowed list
- Considers blocks with specified parent or ancestor
- Memoizes the result for performance optimization

### Return Value

The hook returns an array of strings containing the names of allowed blocks.

### Dependencies

- `@wordpress/data`: For accessing WordPress data store
- `@wordpress/element`: For using the `useMemo` hook

### Note

This hook is particularly useful when working with nested blocks in Gutenberg, where you need to restrict the types of blocks that can be added inside a specific parent block.

---

# useAccordionItem

A custom hook for managing accordion item behavior in Gutenberg blocks.

## Usage

```jsx
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useAccordionItem } from '@secretstache/wordpress-gutenberg';

export const edit = ({ clientId, context }) => {
    const { activeItemClientId, setActiveItemClientId } = context;

    const { blockRef, toggleContent, isActive } = useAccordionItem(
        clientId,
        activeItemClientId,
        setActiveItemClientId,
        '.wp-block-ssm-accordion__content'
    );

    const blockProps = useBlockProps({
        ref: blockRef,
        className: `wp-block-ssm-accordion__item ${isActive ? 'is-active' : ''}`,
    });

    return (
        <div {...blockProps}>
            <header className="wp-block-ssm-accordion__header" onClick={toggleContent}>
                <h3>Accordion Title</h3>
            </header>
            <div className="wp-block-ssm-accordion__content">
                <InnerBlocks />
            </div>
        </div>
    );
};
```

### Parameters

| Parameter       | Type     | Description                                                   |
|-----------------|----------|---------------------------------------------------------------|
| `itemId`        | String   | The unique identifier for the accordion item                  |
| `activeItemId`  | String   | The currently active item's ID                                |
| `setActiveItemId`| Function | Function to set the active item ID                            |
| `contentSelector`| String   | CSS selector for the accordion content element                |

### Return Value

| Property       | Type     | Description                                                   |
|----------------|----------|---------------------------------------------------------------|
| `blockRef`     | Object   | Ref object for the accordion item container                   |
| `toggleContent`| Function | Function to toggle the accordion item's open state            |
| `isActive`     | Boolean  | Whether the accordion item is currently active/open           |

### Note

These examples demonstrate how to use the `useAccordionItem` hook in various scenarios, including basic usage, integration with the Gutenberg block editor, and handling dynamic content. The hook provides the necessary functionality to manage accordion behavior, including toggling, active state tracking, and content height adjustments.

---

# useBlockTabsData

A hook for managing tabs in a Gutenberg block.

## Usage

```jsx
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { useBlockTabsData } from '@secretstache/wordpress-gutenberg';

export const edit = ({ clientId }) => {
    const {
        childBlocks,
        activeItemId,
        setActiveItemId,
        AddNewTabButton,
    } = useBlockTabsData(clientId, 'ssm/tabs-item', createBlock);

    const blockProps = useBlockProps();
    const innerBlocksProps = useInnerBlocksProps(
        { className: 'wp-block-ssm-tabs__content' },
        {
            allowedBlocks: ['ssm/tabs-item'],
            template: [['ssm/tabs-item', { title: 'Tab 1' }]],
            renderAppender: false,
            orientation: 'horizontal',
            __experimentalCaptureToolbars: true,
        }
    );

    return (
        <div {...blockProps}>
            <div className="wp-block-ssm-tabs__container">
                <nav className="wp-block-ssm-tabs__wrapper">
                    {childBlocks.map((block) => (
                        <div
                            key={block.clientId}
                            className={`wp-block-ssm-tabs__item-title ${
                                activeItemId === block.clientId ? 'is-active' : ''
                            }`}
                            onClick={() => setActiveItemId(block.clientId)}
                        >
                            {block.attributes.title}
                        </div>
                    ))}
                </nav>

                <div {...innerBlocksProps}>
                    {innerBlocksProps.children}
                </div>
            </div>

            <AddNewTabButton />
        </div>
    );
};
```

### Parameters

| Parameter       | Type     | Description                                                       |
|-----------------|----------|-------------------------------------------------------------------|
| `clientId`      | String   | ID of the block for which tabs are being created                  |
| `itemBlockName` | String   | Name of the block used for individual tabs                        |
| `createBlock`   | Function | Function to create a new block                                    |

### Return Value

| Property              | Type          | Description                                                       |
|-----------------------|---------------|-------------------------------------------------------------------|
| `childBlocks`         | Array         | Array of child blocks (tabs)                                      |
| `activeItemId`        | String        | ID of the active tab                                              |
| `setActiveItemId`     | Function      | Function to set the active tab                                    |
| `AddNewTabButton`     | Component     | Component for adding a new tab button                             |
| `innerBlocksCount`    | Number        | Number of child blocks                                            |
| `selectedBlock`       | Object        | Currently selected block                                          |
| `selectedBlockClientId`| String       | ID of the selected block                                          |
| `parentBlockId`       | String        | ID of the parent block                                            |
| `getBlockRootClientId`| Function      | Function to get the root block ID                                 |

### Note

This hook provides functionality for managing tabs in Gutenberg blocks, including adding new tabs, tracking the active tab, and working with child blocks. It's particularly useful when creating complex blocks with nested structures. The example shows how to integrate it within the edit function of a Gutenberg block, including the use of `InspectorControls` for block settings.

---

# useColorChange

A custom hook for handling color changes in Gutenberg blocks.

## Usage

```jsx
import { useColorChange } from '@secretstache/wordpress-gutenberg';
import { ColorPalette } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export const edit = ({ attributes, setAttributes }) => {
    const colors = useSelect(select => select('core/editor').getEditorSettings().colors, []);
    const handleColorChange = useColorChange(colors, setAttributes);

    return (
        <ColorPalette
            colors={colors}
            value={attributes.backgroundColor?.value}
            onChange={(color) => handleColorChange(color, 'backgroundColor')}
        />
    );
};
```

### Parameters

| Parameter      | Type     | Description                                         |
|----------------|----------|-----------------------------------------------------|
| `colors`       | Array    | Array of color objects from editor settings         |
| `setAttributes`| Function | Function to update block attributes                 |

### Return Value

| Parameter     | Type     | Description                                         |
|---------------|----------|-----------------------------------------------------|
| `colorValue`  | String   | The selected color value                            |
| `property`    | String   | The attribute property to update with the new color |

### Features

- Finds the selected color in the provided colors array
- Updates the specified attribute with the selected color information
- Handles cases where the selected color is not in the predefined palette

### Note

This hook simplifies the process of updating color attributes in Gutenberg blocks. It automatically handles the conversion between color values and color objects, including the color slug when available. If the selected color is not found in the predefined palette, it sets the attribute to null.

---

# useDataQuery

A custom hook for fetching and managing post data in Gutenberg blocks.

## Usage

```jsx
import { useDataQuery, QUERY_TYPES } from '@secretstache/wordpress-gutenberg';

export const edit = ({ attributes, setAttributes }) => {
    const {
        queryType,
        curatedPostsIds,
        categoriesTaxonomy,
        curatedCategoriesIds,
        numberOfPosts
    } = attributes;

    const { postsToShow, isLoading } = useDataQuery({
        getPostType: () => 'post',
        queryType,
        curatedPostsIds,
        categoriesTaxonomy,
        curatedCategoriesIds,
        numberOfPosts,
        extraQueryArgs: { status: 'publish' },
        dependencies: [queryType, curatedPostsIds, categoriesTaxonomy, curatedCategoriesIds, numberOfPosts],
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {postsToShow.map(post => (
                <h2 key={post.id}>{post.title.rendered}</h2>
            ))}
        </div>
    );
};
```

## Latest Posts

```jsx
const { postsToShow, isLoading } = useDataQuery({
    getPostType: () => 'post',
    queryType: QUERY_TYPES.LATEST,
    numberOfPosts: 5,
    dependencies: [numberOfPosts],
});
```

## Curated Posts

```jsx
const { postsToShow, isLoading } = useDataQuery({
    getPostType: () => 'post',
    queryType: QUERY_TYPES.CURATED,
    curatedPostsIds: [1, 2, 3, 4, 5],
    dependencies: [curatedPostsIds],
});
```

## Posts by Category

```jsx
const { postsToShow, isLoading } = useDataQuery({
    getPostType: () => 'post',
    queryType: QUERY_TYPES.BY_CATEGORY,
    categoriesTaxonomy: 'category',
    curatedCategoriesIds: [10, 20, 30],
    numberOfPosts: -1, // all posts
    dependencies: [curatedCategoriesIds],
});
```

## Custom Post Type with Extra Query Args

```jsx
const { postsToShow, isLoading } = useDataQuery({
    getPostType: () => 'custom_post_type',
    queryType: QUERY_TYPES.LATEST,
    numberOfPosts: 10,
    extraQueryArgs: { 
        status: 'publish',
        meta_key: 'featured',
        meta_value: 'yes'
    },
    dependencies: [numberOfPosts],
});
```

### Parameters

| Parameter             | Type      | Description                                               |
|-----------------------|-----------|-----------------------------------------------------------|
| `getPostType`         | Function  | Function that returns the post type to query              |
| `queryType`           | String    | Type of query (e.g., LATEST, CURATED, BY_CATEGORY)        |
| `curatedPostsIds`     | Array     | Array of post IDs for curated query                       |
| `categoriesTaxonomy`  | String    | Taxonomy to use for category queries                      |
| `curatedCategoriesIds`| Array     | Array of category IDs for category queries                |
| `numberOfPosts`       | Number    | Number of posts to fetch (-1 for all)                     |
| `extraQueryArgs`      | Object    | Additional query arguments                                |
| `dependencies`        | Array     | Dependencies array for useSelect hook                     |

### Return Value

The hook returns an object with the following properties:

| Property      | Type     | Description                                |
|---------------|----------|--------------------------------------------|
| `postsToShow` | Array    | Array of fetched posts                     |
| `isLoading`   | Boolean  | Indicates whether the query is still loading|

### Note

This hook is useful for fetching posts based on various query types and parameters, including curated posts, category-based queries, and additional query arguments. It handles loading state and returns the fetched posts.

---

# usePreviewToggle

A custom hook that provides a toggle control for previewing block content in the Gutenberg editor.

## Usage

```jsx
import { usePreviewToggle } from '@secretstache/wordpress-gutenberg';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

export const edit = ({ attributes, setAttributes }) => {
    const { isPreview, renderPreviewToggle } = usePreviewToggle();

    return (
        <>
            <InspectorControls>
                <PanelBody title="Preview Settings">
                    {renderPreviewToggle()}
                </PanelBody>
            </InspectorControls>

            <div {...useBlockProps()}>
                {isPreview ? (
                    <div className="preview-mode">
                        {/* Render preview content */}
                    </div>
                ) : (
                    <div className="edit-mode">
                        {/* Render editable content */}
                    </div>
                )}
            </div>
        </>
    );
};
```

## Custom Label and Help Text

```jsx
const { isPreview, renderPreviewToggle } = usePreviewToggle({
    label: 'Show Live Version',
    helpText: 'Toggle to see the live version of this block.'
});
```

## Disabled Toggle

```jsx
const { isPreview, renderPreviewToggle } = usePreviewToggle({
    disabled: true,
    helpText: 'Preview is currently unavailable.'
});
```

### Parameters

The hook accepts an optional configuration object with the following properties:

| Parameter  | Type     | Default            | Description                                                                                           |
|------------|----------|--------------------|-------------------------------------------------------------------------------------------------------|
| `disabled` | Boolean  | false              | Whether the toggle control should be disabled                                                         |
| `label`    | String   | 'Enable Preview'   | Label for the toggle control                                                                          |
| `helpText` | String   | 'Please check this option to see how the block will actually look and behave on the frontend.' | Help text for the toggle control                                                                      |

### Return Value

The hook returns an object with the following properties:

| Property             | Type     | Description                                        |
|----------------------|----------|----------------------------------------------------|
| `isPreview`          | Boolean  | The current state of the preview toggle            |
| `renderPreviewToggle`| Function | A function that renders the ToggleControl component|

### Note

This hook simplifies the process of adding a preview toggle to your Gutenberg blocks. It's particularly useful for blocks that have a significant difference between their edit and frontend appearance. The preview functionality allows content creators to see how their block will look on the live site without leaving the editor.

---

# useSlider

A custom hook for initializing and managing a slider component in Gutenberg blocks.

## Usage

```jsx
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import classNames from 'classnames';
import { useSlider, usePreviewToggle } from '@secretstache/wordpress-gutenberg';

import { setupSlider } from './slider-setup';

export const edit = ({ attributes, setAttributes }) => {
    const { isPreview, renderPreviewToggle } = usePreviewToggle({
        label: 'Enable Slider Preview',
        helpText: 'Toggle to see how the slider will appear on the frontend.',
    });

    const { sliderElRef, sliderInstance } = useSlider({
        isEnabled: isPreview,
        setupSlider,
        dependencies: [isPreview],
    });

    const blockProps = useBlockProps({
        className: classNames({
            'is-slider': isPreview,
        }),
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title="Slider Settings">
                    {renderPreviewToggle()}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {isPreview ? (
                    <div ref={sliderElRef} className="slider-container">
                        <div className="slider-wrapper">
                            {/* Slider items */}
                        </div>
                    </div>
                ) : (
                    <div className="regular-content">
                        {/* Regular block content */}
                    </div>
                )}
            </div>
        </>
    );
};
```

### Parameters

The hook accepts an object with the following properties:

| Parameter       | Type     | Description                                               |
|-----------------|----------|-----------------------------------------------------------|
| `isEnabled`     | Boolean  | Whether the slider should be initialized                  |
| `setupSlider`   | Function | Function to initialize the slider                         |
| `dependencies`  | Array    | Additional dependencies for re-initializing the slider    |

### Return Value

The hook returns an object with the following properties:

| Property        | Type     | Description                                            |
|-----------------|----------|--------------------------------------------------------|
| `sliderElRef`   | Object   | Ref object to attach to the slider container           |
| `sliderInstance`| Object   | The current instance of the initialized slider         |

### Features

- Initializes a slider when enabled
- Cleans up the slider instance when the component unmounts or when dependencies change
- Allows for custom slider setup logic
- Provides access to the slider instance for further manipulation

### Note

This hook is useful for initializing and managing a slider component in your React application. It handles the setup and teardown of the slider instance, providing a ref for the slider container and access to the slider instance for further manipulation.

---
