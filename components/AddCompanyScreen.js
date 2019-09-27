import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
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
        <TextInput placeholder="Discount"></TextInput>
        <Button title="TEXT">SUBMIT</Button>
      </View>
    );
  }
}

export default CompanyProfileScreen;
