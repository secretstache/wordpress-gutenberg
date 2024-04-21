"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkControl = void 0;
var _components = require("@wordpress/components");
var _blockEditor = require("@wordpress/block-editor");
var _index = require("../utils/index");
const LinkControl = _ref => {
  let {
    buttonSource,
    isButtonOpenInNewTab,
    setAttributes
  } = _ref;
  const onLinkChange = (0, _index.useLinkChange)(setAttributes);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_components.BaseControl, {
    label: "Source"
  }, /*#__PURE__*/React.createElement(_blockEditor.URLInput, {
    className: "bc-url-input",
    value: buttonSource,
    onChange: newUrl => onLinkChange(newUrl, 'buttonSource')
  })), /*#__PURE__*/React.createElement(_components.CheckboxControl, {
    checked: isButtonOpenInNewTab,
    label: "Open in a new tab",
    onChange: newIsOpenInNewTab => onLinkChange(newIsOpenInNewTab, 'isButtonOpenInNewTab')
  }));
};
exports.LinkControl = LinkControl;