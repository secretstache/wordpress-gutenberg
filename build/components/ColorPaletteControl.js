"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorPaletteControl = void 0;
var _components = require("@wordpress/components");
var _index = require("../utils/index");
const ColorPaletteControl = _ref => {
  let {
    allowedColors,
    colorAttribute,
    attributeName,
    setAttributes
  } = _ref;
  const colors = (0, _index.useThemeColors)(allowedColors);
  const onColorChange = (0, _index.useColorChange)(colors, setAttributes);
  return /*#__PURE__*/React.createElement(_components.ColorPalette, {
    colors: colors,
    value: colorAttribute?.value,
    disableCustomColors: true,
    onChange: colorValue => onColorChange(colorValue, attributeName)
  });
};
exports.ColorPaletteControl = ColorPaletteControl;