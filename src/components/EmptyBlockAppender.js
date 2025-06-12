import { InnerBlocks } from '@wordpress/block-editor';
import classNames from 'classnames';

export const EmptyBlockAppender = (props) => {
    const {
        showIcon = true,
        showAppender = true,
        title = 'This block is empty',
        text = 'Use the "+" button below to add content blocks',
        className,
    } = props;

    return (
        <div className={classNames('empty-block-appender', className)}>
            <div className="empty-block-appender__content">
                {
                    showIcon && (
                        <svg className="empty-block-appender__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    )
                }

                <h3 className="empty-block-appender__title">{title}</h3>
                <p className="empty-block-appender__text">{text}</p>
            </div>

            {
                showAppender && (
                    <div className="empty-block-appender__button">
                        <InnerBlocks.ButtonBlockAppender />
                    </div>
                )
            }
        </div>
    );
};
