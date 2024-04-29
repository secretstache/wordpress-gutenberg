import { RadioControl } from '@wordpress/components';

export const QueryControls = (props) => {
    const {
        dataSource,
        queryType,
        settings,
        setAttributes,
    } = props;

    const sourcesList = settings
        .filter((source) => source?.value && source?.label)
        .map((source) => ({ label: source.label, value: source.value }));

    const queriesList = settings.find((source) => source.value === dataSource)?.queries || [];

    return (
        <>
            {
                sourcesList && sourcesList?.length > 0 && (
                    <RadioControl
                        label="Data Source"
                        selected={dataSource}
                        options={sourcesList}
                        onChange={(dataSource) => setAttributes({ dataSource })}
                    />
                )
            }

            {
                queriesList && queriesList?.length > 0 && (
                    <RadioControl
                        label="Query"
                        selected={queryType}
                        options={queriesList}
                        onChange={(queryType) => setAttributes({ queryType })}
                    />
                )
            }
        </>
    )
}
