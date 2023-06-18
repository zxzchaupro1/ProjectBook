import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@rneui/themed";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider, FullScreenLoadingProvider } from "./src/contexts";

import FlashMessage from "react-native-flash-message";
import { AppNavigator } from "./src/navigator";

import { LogBox } from "react-native";

const IGNORED_LOGS = [
  "Non-serializable values were found in the navigation state",
  "Require cycle:",
  "source.uri should not be an empty string",
  "You are not currently signed in to Expo on your development machine",
];

LogBox.ignoreLogs(IGNORED_LOGS);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <SafeAreaProvider>
        <ThemeProvider>
          <FullScreenLoadingProvider>
            <AuthProvider>
              <AppNavigator />
              <FlashMessage position='top' floating={true} />
            </AuthProvider>
          </FullScreenLoadingProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
