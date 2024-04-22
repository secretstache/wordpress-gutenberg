"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreviewToggle = void 0;
var _blockEditor = require("@wordpress/block-editor");
var _components = require("@wordpress/components");
var _icons = require("@wordpress/icons");
const PreviewToggle = _ref => {
  let {
    attributes,
    setAttributes,
    disabled
  } = _ref;
  const {
    isPreview
  } = attributes;
  const handlePreviewChange = () => {
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
exports.PreviewToggle = PreviewToggle;