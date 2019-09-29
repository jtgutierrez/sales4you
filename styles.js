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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "gray"
  },
  loading: {
    position: "absolute",
    top: 10,
    right: 10,
    bottom: 150,
    left: 10
  },
  title: {
    padding: 0
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "green",
    opacity: 0.3,
    borderRadius: 20
  },
  padding: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#90EE90"
  },
  discountScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "whitesmoke",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  subtitleView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 10,
    paddingTop: 5
  },
  longStyle: {
    marginRight: 20,
    flex: 1,
    flexWrap: "wrap",
    flexBasis: 175
  }
});

export default styles;
