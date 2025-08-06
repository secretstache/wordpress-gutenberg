import { ToggleControl } from '@wordpress/components';

const defaultLabel = 'Enable Preview';
const defaultHelp = 'Please check this option to see how the block will actually look and behave on the frontend.';

export const PreviewControl = (props) => {
    const {
        checked,
        onChange,
        help = defaultHelp,
        label = defaultLabel,
    } = props;

    return (
        <ToggleControl
            checked={checked}
            onChange={onChange}
            label={label}
            help={help}
            {...props}
        />
    );
};
