import { deprecationWarning } from '../utils/internal/helpers.js';

export const editIcon = () => {
    deprecationWarning('Warning: editIcon is deprecated since version 0.6.16 and will be removed in future versions. Please consider to use icons from @wordpress/icons package instead.');

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            <path d="m19 7-3-3-8.5 8.5-1 4 4-1L19 7Zm-7 11.5H5V20h7v-1.5Z" />
        </svg>
    );
}

export const trashIcon = () => {
    deprecationWarning('Warning: trashIcon is deprecated since version 0.6.16 and will be removed in future versions. Please consider to use icons from @wordpress/icons package instead.');

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 5.5A2.25 2.25 0 0 0 9.878 7h4.244A2.251 2.251 0 0 0 12 5.5ZM12 4a3.751 3.751 0 0 0-3.675 3H5v1.5h1.27l.818 8.997a2.75 2.75 0 0 0 2.739 2.501h4.347a2.75 2.75 0 0 0 2.738-2.5L17.73 8.5H19V7h-3.325A3.751 3.751 0 0 0 12 4Zm4.224 4.5H7.776l.806 8.861a1.25 1.25 0 0 0 1.245 1.137h4.347a1.25 1.25 0 0 0 1.245-1.137l.805-8.861Z" />
        </svg>
    );
}

export const pageIcon = () => {
    deprecationWarning('Warning: pageIcon is deprecated since version 0.6.16 and will be removed in future versions. Please consider to use icons from @wordpress/icons package instead.');

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            <path d="M15.5 7.5h-7V9h7V7.5Zm-7 3.5h7v1.5h-7V11Zm7 3.5h-7V16h7v-1.5Z" />
            <path d="M17 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM7 5.5h10a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 .5-.5Z"></path>
        </svg>
    );
}

export const plusIcon = () => {
    deprecationWarning('Warning: plusIcon is deprecated since version 0.6.16 and will be removed in future versions. Please consider to use icons from @wordpress/icons package instead.');

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            <path d="M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z" />
        </svg>
    );
}

export const sidesBottomIcon = () => {
    deprecationWarning('Warning: sidesBottomIcon is deprecated since version 0.6.16 and will be removed in future versions. Please consider to use icons from @wordpress/icons package instead.');

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            <path d="m7.5 6h9v-1.5h-9zm0 13.5h9v-1.5h-9zm-3-3h1.5v-9h-1.5zm13.5-9v9h1.5v-9z" style={{ opacity: 0.25 }} />
            <path d="m16.5 19.5h-9v-1.5h9z" />
        </svg>
    );
}

export const sidesTopIcon = () => {
    deprecationWarning('Warning: sidesTopIcon is deprecated since version 0.6.16 and will be removed in future versions. Please consider to use icons from @wordpress/icons package instead.');

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            <path d="m7.5 6h9v-1.5h-9zm0 13.5h9v-1.5h-9zm-3-3h1.5v-9h-1.5zm13.5-9v9h1.5v-9z" style={{ opacity: 0.25 }} />
            <path d="m16.5 6h-9v-1.5h9z" />
        </svg>
    );
}

export const addTemplateIcon = () => {
    deprecationWarning('Warning: addTemplateIcon is deprecated since version 0.6.16 and will be removed in future versions. Please consider to use icons from @wordpress/icons package instead.');

    return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" focusable="false">
            <path fillRule="evenodd" clipRule="evenodd" d="M18.5 5.5V8H20V5.5H22.5V4H20V1.5H18.5V4H16V5.5H18.5ZM13.9624 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V10.0391H18.5V18C18.5 18.2761 18.2761 18.5 18 18.5H10L10 10.4917L16.4589 10.5139L16.4641 9.01389L5.5 8.97618V6C5.5 5.72386 5.72386 5.5 6 5.5H13.9624V4ZM5.5 10.4762V18C5.5 18.2761 5.72386 18.5 6 18.5H8.5L8.5 10.4865L5.5 10.4762Z" />
        </svg>
    );
}
