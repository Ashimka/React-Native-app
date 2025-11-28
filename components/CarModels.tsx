import { Brand } from "@/types/auto";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface CarModelsProps {
  brands: Brand;
  onClose: () => void;
  onModelSelect: (model: string) => void;
}

const CarModels = ({ brands, onClose, onModelSelect }: CarModelsProps) => {
  const [visibleCount, setVisibleCount] = React.useState(10);

  const dataToShow = brands.models.slice(0, visibleCount);

  const showAll = () => {
    setVisibleCount(brands.models.length);
  };
  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-surface-light text-lg">Выберите модель</Text>
        <TouchableOpacity onPress={onClose}>
          <Text className="text-surface-light text-xl p-2">&#10006;</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataToShow}
        keyExtractor={(item, index) => `${item.model}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-primary-light p-4 mx-1 mb-1"
            onPress={() => onModelSelect(item.model)}
          >
            <Text className="text-white text-lg">{item.model}</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity className="mt-4 p-3 items-center" onPress={showAll}>
            <Text className="text-sm text-primary-dark">
              {visibleCount <= 10 &&
                brands.models.length > 10 &&
                "Показать все"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CarModels;
