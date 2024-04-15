"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkControl = void 0;
var _components = require("@wordpress/components");
var _blockEditor = require("@wordpress/block-editor");
var _index = require("../utils/index");
var LinkControl = exports.LinkControl = function LinkControl(_ref) {
  var buttonSource = _ref.buttonSource,
    isButtonOpenInNewTab = _ref.isButtonOpenInNewTab,
    setAttributes = _ref.setAttributes;
  var onLinkChange = (0, _index.useLinkChange)(setAttributes);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_components.BaseControl, {
    label: "Source"
  }, /*#__PURE__*/React.createElement(_blockEditor.URLInput, {
    className: "bc-url-input",
    value: buttonSource,
    onChange: function onChange(newUrl) {
      return onLinkChange(newUrl, 'buttonSource');
    }
  })), /*#__PURE__*/React.createElement(_components.CheckboxControl, {
    checked: isButtonOpenInNewTab,
    label: "Open in a new tab",
    onChange: function onChange(newIsOpenInNewTab) {
      return onLinkChange(newIsOpenInNewTab, 'isButtonOpenInNewTab');
    }
  }));
};