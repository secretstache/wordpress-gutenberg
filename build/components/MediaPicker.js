"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BCVideoRenderer = exports.BCMediaPicker = exports.BCImageRenderer = void 0;
var _components = require("@wordpress/components");
var _blockEditor = require("@wordpress/block-editor");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const BCImageRenderer = _ref => {
  let {
    imageId,
    imageUrl,
    onImageClick,
    onRemoveClick,
    onSelectClick
  } = _ref;
  return imageId && imageUrl ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "bc-selected-media-wrapper"
  }, /*#__PURE__*/React.createElement("img", {
    src: imageUrl,
    className: "bc-selected-media bc-selected-media--image",
    alt: "Selected Image",
    onClick: onImageClick
  })), /*#__PURE__*/React.createElement(_components.Button, {
    className: "bc-remove-btn",
    onClick: onRemoveClick,
    isSecondary: true,
    isDestructive: true
  }, "Remove Image")) : /*#__PURE__*/React.createElement(_components.Button, {
    variant: "secondary",
    onClick: onSelectClick,
    className: "bc-select-btn"
  }, "Select Image");
};
exports.BCImageRenderer = BCImageRenderer;
const BCVideoRenderer = _ref2 => {
  let {
    videoId,
    videoUrl,
    onRemoveClick,
    onSelectClick
  } = _ref2;
  return videoId && videoUrl ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "bc-selected-media-wrapper"
  }, /*#__PURE__*/React.createElement("video", {
    src: videoUrl,
    className: "bc-selected-media bc-selected-media--video",
    controls: true
  })), /*#__PURE__*/React.createElement(_components.Button, {
    className: "bc-remove-btn",
    onClick: onRemoveClick,
    isSecondary: true,
    isDestructive: true
  }, "Remove Video")) : /*#__PURE__*/React.createElement(_components.Button, {
    variant: "secondary",
    onClick: onSelectClick,
    className: "bc-select-btn"
  }, "Select Video");
};
exports.BCVideoRenderer = BCVideoRenderer;
const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video'
};
const BCMediaPicker = _ref3 => {
  let {
    mediaId,
    mediaUrl,
    onSelect,
    onRemove,
    type = MEDIA_TYPES.IMAGE,
    ...other
  } = _ref3;
  if (type === MEDIA_TYPES.IMAGE) {
    return /*#__PURE__*/React.createElement(_blockEditor.MediaUploadCheck, null, /*#__PURE__*/React.createElement(_blockEditor.MediaUpload, _extends({
      onSelect: onSelect,
      allowedTypes: ['image', 'image/svg+xml'],
      accept: "image/*",
      value: mediaId,
      render: _ref4 => {
        let {
          open
        } = _ref4;
        return /*#__PURE__*/React.createElement(BCImageRenderer, {
          imageId: mediaId,
          imageUrl: mediaUrl,
          onImageClick: open,
          onSelectClick: open,
          onRemoveClick: onRemove
        });
      }
    }, other)));
  } else if (type === MEDIA_TYPES.VIDEO) {
    return /*#__PURE__*/React.createElement(_blockEditor.MediaUploadCheck, null, /*#__PURE__*/React.createElement(_blockEditor.MediaUpload, _extends({
      onSelect: onSelect,
      allowedTypes: ['video'],
      value: mediaId,
      render: _ref5 => {
        let {
          open
        } = _ref5;
        return /*#__PURE__*/React.createElement(BCVideoRenderer, {
          videoId: mediaId,
          videoUrl: mediaUrl,
          onSelectClick: open,
          onRemoveClick: onRemove
        });
      }
    }, other)));
  } else {
    throw new Error('Unrecognized media type.');
  }
};
exports.BCMediaPicker = BCMediaPicker;