import React from "react";
import Touchable from "../Touchable/Touchable";
import { View, StyleSheet } from "react-native";

/**
 *
 * @param {import('react-native-base').RowProps} props
 */
const Row = props => {
  const { children, flex, style, alignHorizontal, alignVertical, alignSelf, onPress } = props;
  /**
   * @type {import("react-native").FlexStyle}
   */
  const flexStyle = {
    alignItems: alignVertical,
    justifyContent: alignHorizontal,
    alignSelf: alignSelf,
    flexDirection: "row",
    flex: flex
  };

  if (style) {
    if (StyleSheet.flatten(style).alignItems) {
      flexStyle.alignItems = StyleSheet.flatten(style).alignItems;
    }

    if (StyleSheet.flatten(style).justifyContent) {
      flexStyle.justifyContent = StyleSheet.flatten(style).justifyContent;
    }

    if (StyleSheet.flatten(style).alignSelf) {
      flexStyle.alignSelf = StyleSheet.flatten(style).alignSelf;
    }

    if (StyleSheet.flatten(style).height) {
      flexStyle.flex = 0;
    }
  }

  if (onPress && typeof onPress === "function") {
    return (
      <Touchable style={style} onPress={onPress} contentStyle={flexStyle}>
        {children}
      </Touchable>
    );
  }

  return <View style={[style, flexStyle]}>{children}</View>;
};

export default Row;
