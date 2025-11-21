import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Statistics = () => {
  return (
    <SafeAreaView className="flex-1 bg-bgDefault p-5">
      <View>
        <Text className=" text-white">Статистика</Text>
      </View>
    </SafeAreaView>
  );
};

export default Statistics;
