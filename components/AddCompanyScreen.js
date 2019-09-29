import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button, DataTable } from "react-native-paper";
import { connect } from "react-redux";

import styles from "../styles";

class CompanyProfileScreen extends Component {
  static navigationOptions = {
    title: "ADD YOUR COMPANY"
  };
  render() {
    return (
      <View style={styles.addCompanyScreen}>
        <TextInput placeholder="Email"></TextInput>
        <TextInput placeholder="Name"></TextInput>
        <TextInput placeholder="Address"></TextInput>
        <TextInput placeholder="Item"></TextInput>
        <TextInput placeholder="Dicount"></TextInput>
        <Button title="TEXT">SUBMIT</Button>
      </View>
    );
  }
}

export default CompanyProfileScreen;
