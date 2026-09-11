import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { colors } from "../constants/theme"
import { EventosProvider } from "../contexts/EventosContext"

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <EventosProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.textPrimary,
            headerShadowVisible: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="index" options={{ title: "Calendario" }} />
          <Stack.Screen name="dia/[fecha]" options={{ title: "Día" }} />
        </Stack>
        <StatusBar style="light" />
      </EventosProvider>
    </SafeAreaProvider>
  )
}