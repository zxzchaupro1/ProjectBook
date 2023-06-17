import React, { memo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackNavigator } from "./app-stack-navigator";
import { AuthStackNavigator } from "./auth-stack-navigator";
import { AppRouter } from "../constants";
import { Member } from "../screens/member";
import { Payment } from "../screens/payment";

const Stack = createNativeStackNavigator();

export const RootNavigator = memo(({ isLoggedIn }) => {
  console.log("isLoggedIn", isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={AppRouter.payment}
          component={Payment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={AppRouter.member}
          component={Member}
          options={{ headerShown: false }}
        />
        {/* {isLoggedIn ? (
          <Stack.Screen name='app' component={AppStackNavigator} />
        ) : (
          <Stack.Screen name='auth' component={AuthStackNavigator} />
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
});
