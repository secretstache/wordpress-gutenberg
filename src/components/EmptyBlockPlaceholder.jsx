import { InnerBlocks } from '@wordpress/block-editor';
import { Icon, addTemplate } from '@wordpress/icons';
import { Button } from '@wordpress/components';
import classNames from 'classnames';

import { __experimentalPatternAppender as PatternAppender } from './PatternAppender.jsx';

export const __experimentalEmptyBlockPlaceholder = (props) => {
    const {
        title = 'This block is empty',
        text = 'Use the "+" button below to add content blocks',
        showIcon = true,
        hasBlockAppender = true,
        hasPatternAppender = true,
        clientId,
        isLight = false,
        className,
    } = props;

    return (
        <div className={classNames('empty-block-placeholder', className, { 'empty-block-placeholder--light': isLight })}>
            <div className="empty-block-placeholder__content">
                {
                    showIcon && (
                        <svg className="empty-block-placeholder__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    )
                }

                <h3 className="empty-block-placeholder__title">{title}</h3>
                <p className="empty-block-placeholder__text">{text}</p>
            </div>

            <div className="empty-block-placeholder__buttons-wrapper">
                {
                    hasBlockAppender && (
                        <div className="empty-block-placeholder__button">
                            <InnerBlocks.ButtonBlockAppender />
                        </div>
                    )
                }

                {
                    hasPatternAppender && (
                        <div className="empty-block-placeholder__button">
                            <PatternAppender
                                render={({ setModalOpen }) => (
                                    <Button
                                        __next40pxDefaultSize
                                        className="block-editor-button-block-appender"
                                        onClick={() => setModalOpen(true)}
                                        label="Add Pattern"
                                        showTooltip
                                    >
                                        <Icon icon={addTemplate} />
                                    </Button>
                                )}
                                rootClientId={clientId}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
};
