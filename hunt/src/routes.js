import { createStackNavigator } from "react-navigation";

import Login from "./pages/login";
import LoginNumber from "./pages/loginNumber";
import Register from "./pages/register";
import Map from "./pages/map";

export default createStackNavigator({
  Login,
  Register,
  LoginNumber,
  Map,
}, 
{
  navigationOptions : {
    headerStyle: {
      backgroundColor: "#4b4b4b",
      visible: "false"
    }
  }
});