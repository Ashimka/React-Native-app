import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import autoData from "@/data/autoData";
import { Brand } from "@/types/auto";

interface CarBrandsProps {
  onClose: () => void;
  onBrandSelect: (brand: Brand) => void;
}

const CarBrands = ({ onClose, onBrandSelect }: CarBrandsProps) => {
  const [showAll, setShowAll] = React.useState(false);

  const filteredBrands: Brand[] = showAll
    ? autoData
    : autoData.filter((item) => item.popular);

  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center">
        <Text className="text-surface-light text-lg">Выберите бренд</Text>
        <TouchableOpacity onPress={onClose}>
          <Text className="text-surface-light text-xl p-2">&#10006;</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredBrands}
        numColumns={2}
        keyExtractor={(item) => item.brand}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-primary-light w-[48%] p-4 mx-1 mb-1"
            onPress={() => onBrandSelect(item)}
          >
            <Text className="text-white text-lg text-left">{item.brand}</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            className="mt-4 items-center"
            onPress={() => setShowAll(!showAll)}
          >
            <Text className="text-primary-dark text-sm">
              {!showAll && "Показать все"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CarBrands;
