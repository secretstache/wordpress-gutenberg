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

* `label`: String, control label (default: "Color")
* `value`: String, current color value
* `attributeName`: String, attribute name for storing color
* `setAttributes`: Function to update block attributes
* `allowedColors`: Array of strings, limits theme color choices (optional). If not provided or empty, all colors from theme.json will be displayed.

### Additional Exports

* `useThemeColors`: Hook to get theme colors
* `useColorChange`: Hook to handle color changes
* `getBackgroundColorClass`: Function to generate background color class

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

* `dataSourceLabel`: String, label for data source selection (default: "Data Source")
* `dataSource`: String, current selected data source
* `onDataSourceChange`: Function, called when data source changes
* `queryTypeLabel`: String, label for query type selection (default: "Query")
* `queryType`: String, current selected query type
* `onQueryTypeChange`: Function, called when query type changes
* `settings`: Array of objects, defines available data sources and their corresponding query types

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

## useDataQuery

Hook for executing data queries based on selected parameters.

### Parameters

* `getPostType`: Function returning the post type for the query
* `queryType`: String, type of query (e.g., QUERY_TYPES.CURATED, QUERY_TYPES.LATEST, QUERY_TYPES.BY_CATEGORY)
* `curatedPostsIds`: Array of IDs for curated posts (used if `queryType === QUERY_TYPES.CURATED`)
* `categoriesTaxonomy`: String, name of the category taxonomy (used if `queryType === QUERY_TYPES.BY_CATEGORY`)
* `curatedCategoriesIds`: Array of category IDs (used if `queryType === QUERY_TYPES.BY_CATEGORY`)
* `numberOfPosts`: Number of posts to query (default: -1, all posts)
* `extraQueryArgs`: Object, additional query arguments to be passed to the WordPress API
* `dependencies`: Array of dependencies for re-running the query

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

* `topDividers`: Array of objects, defines available top divider options
* `bottomDividers`: Array of objects, defines available bottom divider options
* `value`: Object, current divider settings (default: `{ topDivider: '', bottomDivider: '', isIncludeLine: false }`)
* `hasLine`: Boolean, whether to include the vertical line option (default: true)
* `onChange`: Function, called when divider settings change

### Return Value

The component returns an object with the following properties:

* `topDivider`: String, selected top divider value
* `bottomDivider`: String, selected bottom divider value
* `isIncludeLine`: Boolean, whether to include the vertical line

### Notes

The `DividersControl` component provides a user-friendly interface for selecting top and bottom dividers, as well as an option to include a vertical line. It's designed to work seamlessly within Gutenberg block settings.


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

* `imageId`: Number, ID of the selected image
* `imageUrl`: String, URL of the selected image
* `imageAlt`: String, alt text for the selected image
* `svgCode`: String, SVG code if the selected image is an SVG file
* `onSelect`: Function, called when an image is selected
* `onRemove`: Function, called when the image is removed

### Features

* Supports both regular images and SVG files
* Provides a media placeholder when no image is selected
* Displays a preview of the selected image or SVG
* Offers options to replace or remove the selected image
* Uses WordPress components for consistent UI and functionality

### Notes

The `IconPicker` component provides a user-friendly interface for selecting and managing icon images within Gutenberg blocks. It integrates seamlessly with the WordPress media library and handles both regular images and SVG files.

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

* `url`: Object, contains the URL value and attribute name
  * `value`: String, the current URL value (default: '#')
  * `attrName`: String, the attribute name for storing the URL (default: 'linkSource')

* `isOpenInNewTab`: Object, contains the "open in new tab" value and attribute name
  * `value`: Boolean, whether the link should open in a new tab (default: false)
  * `attrName`: String, the attribute name for storing the "open in new tab" setting (default: 'linkIsOpenInNewTab')

* `setAttributes`: Function, used to update block attributes
* `label`: String, label for the URL input field (default: 'Source')

### Features

* Provides a URL input field using the WordPress URLInput component
* Includes a checkbox for setting whether the link should open in a new tab
* Uses WordPress components for consistent UI and functionality
* Integrates with block attributes for easy state management

### Notes

The `LinkControl` component simplifies the process of adding and managing links within Gutenberg blocks. It handles both the URL input and the "open in new tab" option, providing a complete solution for link management.


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

* `mediaId`: Number, ID of the selected media
* `mediaUrl`: String, URL of the selected media
* `mediaFileName`: String, filename of the selected media (used for animation files)
* `onSelect`: Function, called when media is selected
* `onRemove`: Function, called when media is removed
* `type`: String, type of media to handle (`MEDIA_TYPES.IMAGE`, `MEDIA_TYPES.VIDEO`, or `MEDIA_TYPES.ANIMATION`)
* `selectButtonLabel`: String, custom label for the select button
* `removeButtonLabel`: String, custom label for the remove button
* `...other`: Additional props passed to the `MediaUpload` component

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

* `mediaTypes`: Array of `MEDIA_TYPES`, defines available media type options
* `mediaId`: Number, ID of the selected media
* `mediaUrl`: String, URL of the selected media
* `mediaFileName`: String, filename of the selected media (used for animation files)
* `mediaOnSelect`: Function, called when media is selected
* `mediaOnRemove`: Function, called when media is removed

### Features

* Allows selection of media type from provided options
* Dynamically renders appropriate `BCMediaPicker` based on selected media type
* Supports multiple media types (Image, Video, Animation)
* Uses WordPress components for consistent UI and functionality
* Integrates seamlessly with the WordPress media library

### Notes

The `MediaTypeControl` component provides a flexible solution for handling various types of media within Gutenberg blocks. It combines media type selection with media management, offering a comprehensive interface for working with different media assets.

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

* `isLoading`: Boolean, indicates if resources are currently being loaded
* `isEmpty`: Boolean, indicates if no resources were found
* `isPlaceholder`: Boolean, indicates if the block should display a placeholder (e.g., when not configured)
* `emptyMessage`: String, custom message to display when no resources are found
* `placeholderProps`: Object, props to pass to the `Placeholder` component
* `children`: React nodes to render when resources are available

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

* `placeholder`: String, placeholder text for the select input
* `loadOptions`: Function, asynchronous function to load options based on input
* `value`: Array, currently selected options
* `onChange`: Function, callback when selected options change
* `onSortEnd`: Function, callback when the order of selected options changes

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
