import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Garage = () => {
  return (
    <SafeAreaView className="flex-1 bg-bgDefault p-5">
      <View>
        <Text className=" text-white">Garage</Text>
      </View>
    </SafeAreaView>
  );
};

export default Garage;
