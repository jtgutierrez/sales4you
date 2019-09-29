import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";
import styles from "../styles";
import { Text, ListItem } from "react-native-elements";

const items = [
  "shoes",
  "button-down shirts",
  "dresses",
  "designer bags",
  "sweaters",
  "hoodies",
  "shorts"
];

class DiscountScreen extends Component {
  static navigationOptions = {
    title: "DISCOUNTS"
  };
  render() {
    const { name, address } = this.props.navigation.state.params;
    if (!name && !address) {
      return (
        <View style={styles.discountScreen}>
          <Text h4>Please go back and select a store</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.discountScreen}>
          <Text h3>{name}</Text>
          <Text h4>{address}</Text>
          <View style={styles.subtitleView}>
            {items.map((item, i) => (
              <ListItem
                style={styles.longStyle}
                title={item}
                key={i}
                leftAvatar={{
                  source: {
                    uri:
                      "https://cdn0.iconfinder.com/data/icons/shopping-essential-icon-set/100/Shopping-Icons-Essential-Set_15-512.png"
                  }
                }}
                bottomDivider
              >
                <Text h3>{item}</Text>
              </ListItem>
            ))}
          </View>
        </View>
      );
    }
  }
}

export default DiscountScreen;
