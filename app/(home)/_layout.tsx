

import { useAuth } from '@/hooks/useAuth';
import { router, Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        router.push("../")
    }
    return (
        <Stack
            screenOptions={{
                headerShown: false,

            }}
        />
    )

}
