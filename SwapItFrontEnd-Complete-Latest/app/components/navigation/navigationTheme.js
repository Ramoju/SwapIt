import { DefaultTheme } from "@react-navigation/native";
import colors from "../../config/colors";

console.log(DefaultTheme);

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.white,
  },
};
console.log(myTheme);
export default myTheme;
