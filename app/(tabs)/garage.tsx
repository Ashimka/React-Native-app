import React from "react";
import { ScrollView, Text, View } from "react-native";

import Button from "@/components/Button";
import CarBrands from "@/components/CarBrands";
import CarInfo from "@/components/CarInfo";
import CarModels from "@/components/CarModels";
import useCarStore from "@/stores/carStore";
import { Brand } from "@/types/auto";
import { Ionicons } from "@expo/vector-icons";

const Garage = () => {
  const [showCarBrands, setShowCarBrands] = React.useState(false);
  const [showCarModels, setShowCarModels] = React.useState(false);
  const [selectedBrand, setSelectedBrand] = React.useState<Brand | null>(null);
  const { addCar, carData } = useCarStore();

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
    // Создаем объект CarData и добавляем в стор
    addCar({
      car: model,
      year: 0,
      mileage: 0,
      color: "Белый",
      fuelType: "Бензин",
      transmission: "Ручная",
    });

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
              {carData.length > 1 ? "Мои авто" : "Мой авто"}
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
        {!isModalVisible && carData.length > 0 && (
          <ScrollView className="mt-4">
            {carData.map((car, index) => (
              <React.Fragment key={`${car.car}-${index}`}>
                <CarInfo car={car.car} />
              </React.Fragment>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Garage;
