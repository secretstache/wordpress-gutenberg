"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.keys.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BCVideoRenderer = exports.BCMediaPicker = exports.BCImageRenderer = void 0;
var _components = require("@wordpress/components");
var _blockEditor = require("@wordpress/block-editor");
var _excluded = ["mediaId", "mediaUrl", "onSelect", "onRemove", "type"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var BCImageRenderer = exports.BCImageRenderer = function BCImageRenderer(_ref) {
  var imageId = _ref.imageId,
    imageUrl = _ref.imageUrl,
    onImageClick = _ref.onImageClick,
    onRemoveClick = _ref.onRemoveClick,
    onSelectClick = _ref.onSelectClick;
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
var BCVideoRenderer = exports.BCVideoRenderer = function BCVideoRenderer(_ref2) {
  var videoId = _ref2.videoId,
    videoUrl = _ref2.videoUrl,
    onRemoveClick = _ref2.onRemoveClick,
    onSelectClick = _ref2.onSelectClick;
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
var MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video'
};
var BCMediaPicker = exports.BCMediaPicker = function BCMediaPicker(_ref3) {
  var mediaId = _ref3.mediaId,
    mediaUrl = _ref3.mediaUrl,
    onSelect = _ref3.onSelect,
    onRemove = _ref3.onRemove,
    _ref3$type = _ref3.type,
    type = _ref3$type === void 0 ? MEDIA_TYPES.IMAGE : _ref3$type,
    other = _objectWithoutProperties(_ref3, _excluded);
  if (type === MEDIA_TYPES.IMAGE) {
    return /*#__PURE__*/React.createElement(_blockEditor.MediaUploadCheck, null, /*#__PURE__*/React.createElement(_blockEditor.MediaUpload, _extends({
      onSelect: onSelect,
      allowedTypes: ['image', 'image/svg+xml'],
      accept: "image/*",
      value: mediaId,
      render: function render(_ref4) {
        var open = _ref4.open;
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
      render: function render(_ref5) {
        var open = _ref5.open;
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