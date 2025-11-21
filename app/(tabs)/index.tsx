import { icons } from "@/constants/icons";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Iindex = () => {
  return (
    <SafeAreaView className="flex-1 bg-bgDefault p-5">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <View className="flex-row items-center justify-between">
          <Image source={icons.logo} className="size-10" />
          <Text className="text-2xl font-bold text-white">Авто дневник</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Iindex;
