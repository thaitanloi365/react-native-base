import React from "react";

import Touchable from "../Touchable/Touchable";

import { Image, ActivityIndicator, StyleSheet } from "react-native";

/**
 *
 * @param {import("react-native-base").IconProps} props
 */
const Icon = props => {
  const {
    style,
    iconSource,
    iconStyle,
    onPress,
    hitSlop,
    disabled,
    iconContainerStyle,
    loading = false,
    size = 24,
    indicatorProps = {
      color: "white"
    },
    ...other
  } = props;

  /**
   * @type {import("react-native").ViewStyle}
   */
  const containerStyle = {
    width: size * 2,
    height: size * 2,
    borderRadius: size,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    <Touchable
      style={[containerStyle, style]}
      boundedRipple={false}
      disabled={disabled}
      onPress={onPress}
      hitSlop={hitSlop}
      contentStyle={[containerStyle, iconContainerStyle]}
      useForeground
      {...other}
    >
      <Image resizeMode="contain" style={[iconStyle, { opacity: loading ? 0.5 : 1 }]} source={iconSource} />
      {loading && <ActivityIndicator style={StyleSheet.absoluteFill} {...indicatorProps} />}
    </Touchable>
  );
};

export default Icon;
