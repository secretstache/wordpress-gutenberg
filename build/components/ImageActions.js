"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageActions = void 0;
var _blockEditor = require("@wordpress/block-editor");
var _components = require("@wordpress/components");
var ImageActions = exports.ImageActions = function ImageActions(_ref) {
  var imageId = _ref.imageId,
    imageUrl = _ref.imageUrl,
    imageAlt = _ref.imageAlt,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? false : _ref$placeholder,
    onSelectImage = _ref.onSelectImage,
    onRemoveImage = _ref.onRemoveImage,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  var hasImage = imageId && imageUrl;
  return /*#__PURE__*/React.createElement(_blockEditor.MediaUploadCheck, null, /*#__PURE__*/React.createElement(_blockEditor.MediaUpload, {
    onSelect: onSelectImage,
    allowedTypes: ['image'],
    value: imageId,
    render: function render(_ref2) {
      var open = _ref2.open;
      return hasImage ? /*#__PURE__*/React.createElement("div", {
        className: "bc-image-wrapper ".concat(className)
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