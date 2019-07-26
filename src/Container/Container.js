import React, { Fragment } from "react";
import { View } from "react-native";
import Header from "../Header/Header";
import ScrollView from "../ScrollView/ScrollView";

/**
 *
 * @param {import('react-native-base').ContainerProps} props
 */
const Container = props => {
  const { statusBarProps, headerProps, scrollable, style, children } = props;
  const ContentView = scrollable ? ScrollView : View;
  return (
    <Fragment>
      <Header statusBarProps={statusBarProps} {...headerProps} />
      <ContentView style={[{ flex: 1 }, style]}>{children}</ContentView>
    </Fragment>
  );
};

export default Container;
