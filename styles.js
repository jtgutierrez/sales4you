import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mainBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "whitesmoke"
  },
  footer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "gray"
  }
});

export default styles;
