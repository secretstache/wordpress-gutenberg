import { RadioControl } from '@wordpress/components';

// TODO: add support of curated posts, categories; consider merging with the useDataQuery hook
export const DataQueryControls = (props) => {
    const {
        dataSourceLabel = 'Data Source',
        dataSource,
        onDataSourceChange,

        queryTypeLabel = 'Query',
        queryType,
        onQueryTypeChange,

        settings,
    } = props;

    const sourcesList = settings
        .filter((source) => source?.value && source?.label)
        .map((source) => ({ label: source.label, value: source.value }));

    const queriesList = settings.find((source) => source.value === dataSource)?.queries || [];

    const hasSources = sourcesList && sourcesList?.length > 0;
    const hasQueries = queriesList && queriesList?.length > 0;

    return (
        <>
            {
                hasSources && (
                    <RadioControl
                        label={dataSourceLabel}
                        selected={dataSource}
                        options={sourcesList}
                        onChange={onDataSourceChange}
                    />
                )
            }

            {
                hasQueries && (
                    <RadioControl
                        label={queryTypeLabel}
                        selected={queryType}
                        options={queriesList}
                        onChange={onQueryTypeChange}
                    />
                )
            }
        </>
    )
}
