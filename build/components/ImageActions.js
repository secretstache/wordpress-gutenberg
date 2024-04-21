"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageActions = void 0;
var _blockEditor = require("@wordpress/block-editor");
var _components = require("@wordpress/components");
const ImageActions = _ref => {
  let {
    imageId,
    imageUrl,
    imageAlt,
    placeholder = false,
    onSelectImage,
    onRemoveImage,
    className = ''
  } = _ref;
  const hasImage = imageId && imageUrl;
  return /*#__PURE__*/React.createElement(_blockEditor.MediaUploadCheck, null, /*#__PURE__*/React.createElement(_blockEditor.MediaUpload, {
    onSelect: onSelectImage,
    allowedTypes: ['image'],
    value: imageId,
    render: _ref2 => {
      let {
        open
      } = _ref2;
      return hasImage ? /*#__PURE__*/React.createElement("div", {
        className: `bc-image-wrapper ${className}`
      }, /*#__PURE__*/React.createElement("img", {
        src: imageUrl,
        alt: imageAlt,
        onClick: open
      }), /*#__PURE__*/React.createElement("div", {
        className: "bc-image-wrapper__actions"
      }, /*#__PURE__*/React.createElement(_components.Button, {
        className: "bc-image-wrapper__btn bc-image-wrapper__replace-btn",
        type: "button",
        onClick: open
      }, "Replace"), /*#__PURE__*/React.createElement(_components.Button, {
        className: "bc-image-wrapper__btn bc-image-wrapper__remove-btn",
        type: "button",
        onClick: onRemoveImage
      }, "Remove")), /*#__PURE__*/React.createElement("div", {
        className: "bc-image-wrapper__overlay"
      })) : placeholder ? /*#__PURE__*/React.createElement(_blockEditor.MediaPlaceholder, {
        className: "media-placeholder",
        icon: "format-image",
        onSelect: onSelectImage,
        allowedTypes: ['image'],
        labels: {
          title: 'Image',
          instructions: 'Upload an image file or pick one from your media library.'
        }
      }) : null;
    }
  }));
};
exports.ImageActions = ImageActions;