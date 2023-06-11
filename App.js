import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@rneui/themed";
import { QueryClient, QueryClientProvider } from "react-query";
import { rneui } from "./src/utils";
import { AppRouter } from "./src/constants";
import { FullScreenLoadingProvider } from "./src/contexts";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  Login,
  Singup,
  Search,
  CategoryDetail,
  BookDetail,
  BookView,
} from "./src/screens";
import { Tabbar } from "./src/components";
import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <SafeAreaProvider>
        <ThemeProvider theme={rneui}>
          <FullScreenLoadingProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name='bottom-tab'
                  component={Tabbar}
                  options={{ headerShown: false }}
                />
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
                  name={AppRouter.bookDetail}
                  component={BookDetail}
                  options={{ headerShown: true }}
                />
                <Stack.Screen
                  name={AppRouter.bookView}
                  component={BookView}
                  options={({ route }) => ({
                    headerShown: true,
                    title: route.params.headerTitle,
                  })}
                />
                <Stack.Screen
                  name={AppRouter.search}
                  component={Search}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={AppRouter.categoryDetail}
                  component={CategoryDetail}
                  options={{ headerShown: true }}
                />
              </Stack.Navigator>
              <FlashMessage position='top' floating={true} />
            </NavigationContainer>
          </FullScreenLoadingProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
