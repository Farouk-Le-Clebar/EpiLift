import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  pageGlobalContainer: {
    flex: 1,
    gap: width * 0.02,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  formContainer: {

  },

  loginButton: {},
});

export default styles;
