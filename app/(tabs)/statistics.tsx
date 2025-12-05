import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Statistics = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-600 p-5">
      <View>
        <Text className=" text-surface-light text-2xl mx-auto">Статистика</Text>
      </View>
    </SafeAreaView>
  );
};

export default Statistics;
