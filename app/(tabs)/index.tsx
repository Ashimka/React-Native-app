import { icons } from "@/constants/icons";
import useCarStore from "@/stores/carStore";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Iindex = () => {
  const { carData } = useCarStore();

  return (
    <SafeAreaView className="flex-1 bg-bg-dark p-5">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <View className="flex-row items-center justify-between">
          <Image source={icons.logo} className="size-10" />
          <Text className="text-2xl font-bold text-surface-light">
            Авто дневник
          </Text>
        </View>
        <View className="flex-row gap-2">
          {carData.map((item, ind) => (
            <Text key={ind} className="text-surface-light">
              {item.car}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Iindex;
