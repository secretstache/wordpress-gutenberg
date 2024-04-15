"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreviewToggle = void 0;
var _blockEditor = require("@wordpress/block-editor");
var _components = require("@wordpress/components");
var _icons = require("@wordpress/icons");
var PreviewToggle = exports.PreviewToggle = function PreviewToggle(_ref) {
  var attributes = _ref.attributes,
    setAttributes = _ref.setAttributes,
    disabled = _ref.disabled;
  var isPreview = attributes.isPreview;
  var handlePreviewChange = function handlePreviewChange() {
    setAttributes({
      isPreview: !isPreview
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_blockEditor.BlockControls, {
    group: "inline"
  }, /*#__PURE__*/React.createElement(_components.ToolbarButton, {
    icon: _icons.brush,
    onClick: handlePreviewChange,
    isActive: isPreview,
    disabled: disabled
  })), /*#__PURE__*/React.createElement(_components.ToggleControl, {
    label: "Enable Preview",
    help: "Please check this option to see how the block will actually look and behave on the frontend.",
    checked: isPreview,
    onChange: handlePreviewChange,
    disabled: disabled
  }));
};