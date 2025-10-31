import React from "react";
import { StyleSheet, View } from "react-native";
import Home from "./mobile/page/homes/Home";

export default function Index() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
