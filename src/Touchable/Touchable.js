import React from "react";
import { View, Platform, TouchableOpacity, TouchableNativeFeedback, StyleSheet } from "react-native";
import Device from "../Utils/Device";

const isAndroid = Device.isAndroid();
const version = Platform.Version;

const TouchableComponent = props => {
  const { children, useForeground, ...other } = props;
  if (isAndroid) {
    const _useForeground = useForeground && TouchableNativeFeedback.canUseNativeForeground();
    return (
      <TouchableNativeFeedback {...other} useForeground={_useForeground}>
        {children}
      </TouchableNativeFeedback>
    );
  }
  return <TouchableOpacity {...other}>{children}</TouchableOpacity>;
};

/**
 * @typedef {import("react-native-base").TouchableProps} Props
 * @param {Props} props
 */
const Touchable = props => {
  const {
    style,
    onLayout,
    hitSlop,
    background: bg,
    contentStyle,
    children,
    disabled = false,
    ViewComponent = View,
    activeOpacity = 0.7,
    linearProps: lnProps = {
      start: { x: 0, y: 0.5 },
      end: { x: 1, y: 0.5 },
      colors: ["red", "blue"],
      locations: [0, 1]
    },
    boundedRipple = true,
    ...other
  } = props;

  const linearProps = ViewComponent === View ? {} : lnProps;

  const background = isAndroid
    ? version >= 21
      ? bg || TouchableNativeFeedback.Ripple("ThemeAttrAndroid", !boundedRipple)
      : bg || TouchableNativeFeedback.SelectableBackground()
    : null;

  const fixedDimension = {};
  if (style) {
    if (StyleSheet.flatten(style).width) {
      fixedDimension["width"] = StyleSheet.flatten(style).width;
    }
    if (StyleSheet.flatten(style).height) {
      fixedDimension["height"] = StyleSheet.flatten(style).height;
    }
  }
  return (
    <View style={style} onLayout={onLayout} hitSlop={hitSlop}>
      <TouchableComponent {...other} background={background} disabled={disabled}>
        <ViewComponent {...linearProps} style={[styles.view, fixedDimension, contentStyle]}>
          {children}
        </ViewComponent>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    flex: 1
  },
  view: {
    flexDirection: "row",
    justifyContent: "center"
  }
});
export default Touchable;
