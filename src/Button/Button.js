import React from "react";
import { StyleSheet, Platform, ActivityIndicator } from "react-native";
import Touchable from "../Touchable/Touchable";
import Text from "../Text/Text";

/**
 * @typedef {import("react-native-base").ButtonProps} Props
 * @param {Props} props
 */
const Button = props => {
  const { style, raised, text, textStyle, loading = false, indicatorProps = { color: "white" }, ...other } = props;
  return (
    <Touchable
      style={StyleSheet.flatten([style, styles.button, raised && styles.raised])}
      disabled={loading}
      {...other}
    >
      <Text text={text} style={[styles.text, textStyle, { opacity: loading ? 0 : 1 }]} />
      {loading && <ActivityIndicator style={StyleSheet.absoluteFill} {...indicatorProps} />}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  raised: {
    backgroundColor: "#fff",
    ...Platform.select({
      android: {
        elevation: 2
      },
      ios: {
        shadowColor: "rgba(0,0,0, .4)",
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
      }
    })
  },
  text: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    color: "white",
    alignSelf: "center"
  },
  button: {
    backgroundColor: "#007aff",
    borderRadius: 4
  }
});
export default Button;
