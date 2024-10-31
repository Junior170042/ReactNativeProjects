import { Tabs } from 'expo-router';
import { colorApp } from '@/constants/Colors';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const theme = useColorScheme()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorApp.iconTabActive,
        tabBarInactiveTintColor: colorApp.iconTabInActive,
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: `${theme == "dark" ? "#071c38" : "#f7f8fa"}`,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16
        },
        tabBarLabelStyle: {
          fontFamily: "serif",
          fontWeight: "bold",
          alignContent: "center",
        },
        headerStyle: {
          backgroundColor: `${theme == "dark" ? "#071c38" : colorApp.principal}`,
        },
        headerTintColor: "transparent",

      }}

    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={34} color={color} />,
        }
        }
      />
      <Tabs.Screen
        name="extras"
        options={{
          title: 'Extras',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cash-100" size={34} color={color} />
        }}
      />
    </Tabs>
  );
}
