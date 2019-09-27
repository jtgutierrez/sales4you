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
  },
  header: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "gray",
    color: "whitesmoke"
  }
});

export default styles;
