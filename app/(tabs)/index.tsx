import { icons } from "@/constants/icons";
import useCarStore from "@/stores/carStore";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Iindex = () => {
  const { cars } = useCarStore();

  return (
    <SafeAreaView className="flex-1 bg-slate-600 pt-5">
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <View className="flex-row items-center justify-between">
          <Image source={icons.logo} className="size-10" />
          <Text className="text-2xl font-bold text-surface-light">
            Авто дневник
          </Text>
        </View>
        <View className="flex-col gap-2 mt-3">
          {cars.map((item) => (
            <React.Fragment key={item.id}>
              <View className="bg-surface-light dark:bg-surface-dark rounded-lg p-4 my-3 border border-border-light dark:border-border-dark">
                <Text className="text-surface-light text-lg">{item.car}</Text>
                <Text className="text-surface-light">
                  {item.year} год выпуска
                </Text>
              </View>
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Iindex;
