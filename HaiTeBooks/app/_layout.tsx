import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BotTabs from "../app/mobile/components/BotTabs";
import Header from "../app/mobile/components/Header";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Stack
          screenOptions={{
            header: () => <Header />,
          }}
        >
          <Stack.Screen
            name="account"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="account/register"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <BotTabs />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
