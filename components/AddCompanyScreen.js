import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { TextInput, Paragraph } from "react-native-paper";
import styles from "../styles";

class CompanyProfileScreen extends Component {
  static navigationOptions = {
    title: "ADD YOUR COMPANY"
  };
  render() {
    return (
      <View style={styles.mainBackground}>
        <TextInput placeholder="Email"></TextInput>
        <TextInput placeholder="Name"></TextInput>
        <TextInput placeholder="Address"></TextInput>
        <Paragraph placeholder="Address"></Paragraph>
      </View>
    );
  }
}

export default CompanyProfileScreen;
