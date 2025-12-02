import TabIcon from "@/components/TabIcon";
import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#60a5fA",
        tabBarInactiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#303136",
          height: 100,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} icon={icons.home} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="garage"
        options={{
          title: "Гараж",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} icon={icons.garage} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Статистика",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} icon={icons.statistical} />
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
