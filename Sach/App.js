import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@rneui/themed";
import { rneui } from "./src/utils";
import { AppRouter } from "./src/constants";
import { FullScreenLoadingProvider } from "./src/contexts";

import { Book, Login, Singup, Search } from "./src/screens";
import { Tabbar } from "./src/components";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={rneui}>
        <FullScreenLoadingProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='bottom-tab' component={Tabbar} />
              <Stack.Screen
                name={AppRouter.login}
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={AppRouter.signup}
                component={Singup}
                options={{ headerShown: false }}
              />
              {/* screen  */}
              <Stack.Screen
                name={AppRouter.book}
                component={Book}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={AppRouter.search}
                component={Search}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </FullScreenLoadingProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
