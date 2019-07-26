/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, useRef } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar } from "react-native";
import {
  Button,
  Row,
  Text,
  Col,
  Grid,
  Header,
  Device,
  Icon,
  Container,
  TextInput,
  Toast,
  Loading,
  Alert
} from "react-native-base";
import { LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from "react-native/Libraries/NewAppScreen";

const App = () => {
  const [loading, setLoading] = useState(false);
  const _loadingRef = useRef(null);
  const _alertRef = useRef(null);
  const _toastRef = useRef(null);

  console.log("Deviceasdf", Device.isIOS());
  return (
    <Fragment>
      <Container scrollable style={styles.scrollView}>
        <Button style={{ marginHorizontal: 40, marginTop: 120 }} text="Button" onPress={() => console.log("clicked")} />
        <Button
          style={{ marginHorizontal: 40, marginTop: 120, height: 60 }}
          text="Button Fixed Height"
          loading={loading}
          onPress={() => {
            setLoading(true);
            console.log("clicked");
            setTimeout(() => setLoading(false), 3000);
          }}
        />
        <Row onPress={() => console.log("asdf")} style={{ backgroundColor: "gray" }}>
          <Text text="Col 1" style={{ color: "blue" }} />
          <Text text="Col 2" />
        </Row>
        <Col onPress={() => console.log("asdf")} style={{ marginTop: 120, backgroundColor: "red" }}>
          <Text text="Row 1" style={{ color: "blue" }} />
          <Text text="Row 2" />
        </Col>
        <Row>
          <Icon
            style={{ marginHorizontal: 20 }}
            loading={loading}
            iconSource={require("./camera_button.png")}
            onPress={() => {
              _loadingRef.current.show();
              setTimeout(() => _loadingRef.current.hide(), 3000);
            }}
          />
          <Icon
            style={{ marginHorizontal: 20 }}
            loading={loading}
            iconSource={require("./camera_button.png")}
            onPress={() => {
              _alertRef.current.show("asdfas", "asdfasdf");
            }}
          />
          <Icon
            style={{ marginHorizontal: 20 }}
            loading={loading}
            iconSource={require("./camera_button.png")}
            onPress={() => {
              setLoading(true);
              console.log("clicked");
              _toastRef.current.show("asdfasdf", "asdfasdfads");
              setTimeout(() => setLoading(false), 3000);
            }}
          />
        </Row>
        <TextInput placeholder="asdfasdf" />
      </Container>
      <Toast ref={_toastRef} />
      <Loading ref={_loadingRef} />
      <Alert ref={_alertRef} />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter
  },
  engine: {
    position: "absolute",
    right: 0
  },
  body: {
    backgroundColor: Colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark
  },
  highlight: {
    fontWeight: "700"
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right"
  }
});

export default App;
