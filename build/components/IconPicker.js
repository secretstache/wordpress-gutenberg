"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconPicker = void 0;
var _blockEditor = require("@wordpress/block-editor");
var _components = require("@wordpress/components");
var _icons = require("@wordpress/icons");
const IconPicker = _ref => {
  let {
    imageId,
    imageUrl,
    imageAlt,
    svgCode,
    onSelect,
    onRemove
  } = _ref;
  const hasImage = imageId && imageUrl;
  const isSvg = hasImage && svgCode;
  return /*#__PURE__*/React.createElement(_blockEditor.MediaUploadCheck, null, /*#__PURE__*/React.createElement(_blockEditor.MediaUpload, {
    onSelect: onSelect,
    allowedTypes: ['image'],
    value: imageId,
    render: _ref2 => {
      let {
        open
      } = _ref2;
      return hasImage ? /*#__PURE__*/React.createElement("div", {
        className: "bc-image-wrapper"
      }, hasImage && (isSvg ? /*#__PURE__*/React.createElement("div", {
        className: "svg-container",
        dangerouslySetInnerHTML: {
          __html: svgCode
        }
      }) : /*#__PURE__*/React.createElement("img", {
        src: imageUrl,
        alt: imageAlt || 'icon'
      })), /*#__PURE__*/React.createElement("div", {
        className: "bc-image-wrapper__actions"
      }, /*#__PURE__*/React.createElement(_components.Button, {
        className: "bc-image-wrapper__btn bc-image-wrapper__replace-btn",
        type: "button",
        onClick: open
      }, /*#__PURE__*/React.createElement(_components.Icon, {
        icon: _icons.edit,
        size: 20,
        className: "bc-image-wrapper__btn-icon"
      })), /*#__PURE__*/React.createElement(_components.Button, {
        className: "bc-image-wrapper__btn bc-image-wrapper__remove-btn",
        type: "button",
        onClick: onRemove
      }, /*#__PURE__*/React.createElement(_components.Icon, {
        icon: _icons.trash,
        size: 20,
        className: "bc-image-wrapper__btn-icon"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "bc-image-wrapper__overlay"
      })) : /*#__PURE__*/React.createElement(_blockEditor.MediaPlaceholder, {
        icon: "format-image",
        onSelect: onSelect,
        allowedTypes: ['image', 'image/svg+xml'],
        labels: {
          title: 'Icon Image'
        }
      });
    }
  }));
};
exports.IconPicker = IconPicker;