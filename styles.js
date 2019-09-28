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
  },
  loading: {
    position: "absolute",
    top: 10,
    right: 10,
    bottom: 150,
    left: 10
  }
});

export default styles;
