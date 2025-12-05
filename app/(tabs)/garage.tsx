import React from "react";
import { ScrollView, Text, View } from "react-native";

import Button from "@/components/Button";
import CarBrands from "@/components/CarBrands";
import CarInfo from "@/components/CarInfo";
import CarModels from "@/components/CarModels";
import { Brand } from "@/types/auto";
import { Ionicons } from "@expo/vector-icons";

const Garage = () => {
  const [showCarBrands, setShowCarBrands] = React.useState(false);
  const [showCarModels, setShowCarModels] = React.useState(false);
  const [selectedBrand, setSelectedBrand] = React.useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = React.useState<string[]>([]);

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
    setSelectedModel([...selectedModel, model]);
    onCloseModel();
  };

  // Проверяем, показываются ли сейчас модальные окна
  const isModalVisible = showCarBrands || (showCarModels && selectedBrand);

  return (
    <View className="flex-1 bg-slate-600 pt-14">
      <View className="flex-1 px-3">
        <Text className="text-surface-light text-2xl mx-auto">Гараж</Text>
        {!isModalVisible && (
          <View className="mt-4 flex-row justify-between items-center">
            <Text className="text-surface-light text-xl">
              {selectedModel.length > 1 ? "Мои авто" : "Мой авто"}
            </Text>
            <Button
              onPress={() => setShowCarBrands(true)}
              label="Добавить"
              size="medium"
              disabled={showCarBrands || showCarModels}
              icon={<Ionicons name="car-outline" size={24} color="#fff" />}
            />
          </View>
        )}

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
        {/* Показываем список авто только если НЕ открыты модальные окна */}
        {!isModalVisible && selectedModel.length > 0 && (
          <ScrollView className="mt-4">
            {selectedModel.map((model) => (
              <React.Fragment key={model}>
                <CarInfo car={model} />
              </React.Fragment>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Garage;
