import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useAuth } from "./useAuth";
import { router } from "expo-router";

export default function useBackHandler() {
  const navigation = useNavigation();
  // Obtén el estado de la navegación
  const isMainScreen = useNavigationState((state) => {
    const currentRoute = state.routes[state.index]; // Obtén la pestaña activa
    return currentRoute.name === "index"; // Compara con la pestaña principal
  });

  const { removeAuthentication } = useAuth();

  useEffect(() => {
    const backAction = () => {
      if (isMainScreen) {
        // Si estamos en la pantalla principal, mostramos la alerta para confirmar salida
        Alert.alert("Cerrar app!", "¿Quieres cerrar la aplicación?", [
          {
            text: "No",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "Si",
            onPress: () => {
              router.push("../");
              BackHandler.exitApp();
            },
          },
        ]);
        return true;
      } else {
        navigation.goBack();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isMainScreen, navigation]);
}
