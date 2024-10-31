import { Image, StyleSheet, View, } from 'react-native';
import * as LocalAuthentication from "expo-local-authentication"
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import useAppState from '@/hooks/useAppState';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colorApp } from '@/constants/Colors';


export default function Principal() {
    const { isActive } = useAppState()
    const { isAuthenticated, setAuthentication } = useAuth()

    async function authenticate() {
        const result = await LocalAuthentication.authenticateAsync()

        if (result.success === true) {
            setAuthentication()
        }

    }

    useEffect(() => {
        if (isActive && !isAuthenticated) {
            authenticate()
        }


        if (isAuthenticated) {
            router.navigate("/(home)")
        }
    }, [isAuthenticated, isActive])

    return (
        <View style={styles.container}>
            {/* <ThemedText type="subtitle">First screen</ThemedText>
            <ThemedText>
                When you're ready, run{' '}
                <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
                <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
                <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
                <ThemedText type="defaultSemiBold">app-example</ThemedText>.
            </ThemedText> */}

            <Image
                source={require('../assets/images/ExtrApp.png')}
                style={{ objectFit: "cover", height: 500, width: 500, marginTop: 100 }}

            />

            <View>
                <TouchableOpacity style={styles.btn_iniciar} onPress={async () => await authenticate()}>
                    <ThemedText type='subtitle'>Iniciar</ThemedText>
                </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#fff"
    },

    btn_iniciar: {
        padding: 12,
        backgroundColor: colorApp.principal,
        marginTop: -100,
        minWidth: 200,
        alignItems: 'center',
        borderRadius: 20
    }

});