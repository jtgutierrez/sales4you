import React from "react";
import { Image } from "react-native";
import styles from "../styles";

const myimage = require("../SALES4YOU.png");

export default function() {
  return <Image source={myimage} style={styles.title} />;
}
