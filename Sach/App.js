import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import Login from "./src/login";
import Splash from "./src/splash";
import Singup from "./src/singup";
import InfoProduct from "./src/infoProduct";
import Cart from "./src/cart";
import Tabbar from "./src/Tabbar";
import Search from "./src/search";
import Account from "./src/account";
import Contact from "./src/contact";
import Library from "./src/library";




const Stack = createNativeStackNavigator();



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Singup"
          component={Singup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Tabbar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InfoProduct"
          component={InfoProduct}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={Tabbar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Library"
          component={Tabbar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
