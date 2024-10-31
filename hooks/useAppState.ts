import { useEffect, useState } from "react";
import { AppState } from "react-native";
import { useAuth } from "./useAuth";

const useAppState = () => {
  const [isActive, setIsActive] = useState(true);

  const { removeAuthentication } = useAuth();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [isActive]);

  const handleAppStateChange = (newState: string) => {
    switch (newState) {
      case "active":
        setIsActive(true);
        break;
      case "background":
        setIsActive(false);
        removeAuthentication();
        break;
      case "inactive":
        setIsActive(false);
        removeAuthentication();
        break;
    }
  };

  return { isActive };
};

export default useAppState;
