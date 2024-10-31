import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '@/hooks/useAuth';
import { StatusBar } from 'expo-status-bar';
import { ExtraProvider } from '@/hooks/useDatabase';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <>
    <StatusBar />
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ExtraProvider>
        <AuthProvider>

          <GestureHandlerRootView>
            <Stack
              screenOptions={{
                headerShown: false,

              }}
            >
              <Stack.Screen name="(home)" options={{
                headerShown: false,
              }}
              />
            </Stack>
          </GestureHandlerRootView>
        </AuthProvider>
      </ExtraProvider>
    </ThemeProvider>
  </>
}
