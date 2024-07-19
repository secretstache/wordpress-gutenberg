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

## Parameters

* `label`: String, control label (default: "Color")
* `value`: String, current color value
* `attributeName`: String, attribute name for storing color
* `setAttributes`: Function to update block attributes
* `allowedColors`: Array of strings, limits theme color choices (optional). If not provided or empty, all colors from theme.json will be displayed.

## Additional Exports

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

## DataQueryControls

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

## Additional Exports

* `QUERY_TYPES`: Object with query type constants
  * `LATEST`: For retrieving the latest posts
  * `CURATED`: For retrieving specific curated posts
  * `BY_CATEGORY`: For retrieving posts from specific categories

## Notes

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
