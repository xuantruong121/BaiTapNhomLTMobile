import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BotTabs from "../components/BotTabs";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          header: () => <Header />,
        }}
      />

      <View style={styles.container}>
        <Stack
          screenOptions={{
            header: () => <Header />,
          }}
        />
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
