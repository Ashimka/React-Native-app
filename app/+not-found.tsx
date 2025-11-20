import { Link, Stack } from "expo-router";
import { View } from "react-native";

const NotFound = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Opps! Ничего не найдено" }} />

      <View className="flex-1 items-center justify-center">
        <Link href={"/(tabs)"} className="text-red-500">
          Назад
        </Link>
      </View>
    </>
  );
};

export default NotFound;
