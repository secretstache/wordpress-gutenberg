"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorPaletteControl = void 0;
var _components = require("@wordpress/components");
var _index = require("../utils/index");
var ColorPaletteControl = exports.ColorPaletteControl = function ColorPaletteControl(_ref) {
  var allowedColors = _ref.allowedColors,
    colorAttribute = _ref.colorAttribute,
    attributeName = _ref.attributeName,
    setAttributes = _ref.setAttributes;
  var colors = (0, _index.useThemeColors)(allowedColors);
  var onColorChange = (0, _index.useColorChange)(colors, setAttributes);
  return /*#__PURE__*/React.createElement(_components.ColorPalette, {
    colors: colors,
    value: colorAttribute === null || colorAttribute === void 0 ? void 0 : colorAttribute.value,
    disableCustomColors: true,
    onChange: function onChange(colorValue) {
      return onColorChange(colorValue, attributeName);
    }
  });
};