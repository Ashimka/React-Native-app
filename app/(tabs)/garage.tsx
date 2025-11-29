import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/Button";
import CarBrands from "@/components/CarBrands";
import CarModels from "@/components/CarModels";
import { Brand } from "@/types/auto";
import { Ionicons } from "@expo/vector-icons";

const Garage = () => {
  const [showCarBrands, setShowCarBrands] = React.useState(false);
  const [showCarModels, setShowCarModels] = React.useState(false);
  const [selectedBrand, setSelectedBrand] = React.useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = React.useState<string | null>(null);

  const onCloseBrand = () => {
    setShowCarBrands(false);
  };

  const onCloseModel = () => {
    setShowCarModels(false);
  };
  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    setShowCarModels(true);
    onCloseBrand();
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    onCloseModel();
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-dark px-5">
      <View className="flex-1">
        <Text className="text-surface-light text-2xl mx-auto">Гараж</Text>

        <View className="mt-4 flex-row justify-between items-center">
          <Text className="text-surface-light text-xl">
            {selectedModel ? selectedModel : "Not auto"}
          </Text>
          <Button
            onPress={() => setShowCarBrands(true)}
            label="Добавить"
            size="medium"
            disabled={showCarBrands || showCarModels}
            icon={<Ionicons name="car-outline" size={24} color="#fff" />}
          />
        </View>

        {showCarBrands && (
          <CarBrands onClose={onCloseBrand} onBrandSelect={handleBrandSelect} />
        )}

        {showCarModels && selectedBrand && (
          <CarModels
            brands={selectedBrand}
            onClose={onCloseModel}
            onModelSelect={handleModelSelect}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Garage;
