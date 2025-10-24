import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from "expo-router";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack 
        screenOptions={{
          header: () => <Header />,
        }}
      />
    </SafeAreaProvider>
  );
}
