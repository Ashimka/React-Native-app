import useCarStore from "@/stores/carStore";
import { CarData } from "@/types/auto";
import { AntDesign } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import EditCarModal from "./EditCarModal";

interface CarInfoProps {
  car: string;
}

const CarInfo = ({ car }: CarInfoProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { cars: storeCars } = useCarStore();

  // Находим машину в сторе по названию
  const carData = useMemo(() => {
    return storeCars.filter((item) => item.car === car);
  }, [storeCars, car]);

  const handleOpenModal = (auto: CarData) => {
    setModalVisible(true);
  };

  // const handleSave = (data: CarData) => {
  //   // Сохранение обрабатывается в EditCarModal через updateCar
  // };

  return (
    <View className="bg-surface-light dark:bg-surface-dark rounded-lg p-4 my-3 border border-border-light dark:border-border-dark">
      {carData &&
        carData.map((item) => (
          <React.Fragment key={item.car}>
            {/* Заголовок с брендом и кнопкой редактирования */}
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-lg font-bold text-surface-light">
                    {item.car}
                  </Text>
                  <TouchableOpacity
                    className="p-2"
                    onPress={() => handleOpenModal(item)}
                  >
                    <AntDesign name="edit" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                <Text className="text-secondary-light dark:text-secondary-dark text-sm">
                  {item.year} год выпуска
                </Text>
              </View>
            </View>

            {/* Детальная информация */}
            <View className="flex-row flex-wrap gap-4 border-t-2 border-border-light dark:border-border-dark pt-2">
              {/* Пробег */}
              <View className="flex-row items-center">
                <Text className="text-secondary-light dark:text-secondary-dark text-sm">
                  Пробег:
                  <Text className="text-primary-light dark:text-primary-dark font-medium">
                    {" "}
                    {item?.mileage?.toLocaleString()} км
                  </Text>
                </Text>
              </View>

              {/* Цвет */}
              <View className="flex-row items-center">
                <Text className="text-secondary-light dark:text-secondary-dark text-sm">
                  Цвет:
                  <Text className="text-primary-light dark:text-primary-dark font-medium">
                    {" "}
                    {item?.color}
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-secondary-light dark:text-secondary-dark text-sm">
                  Топливо:
                  <Text className="text-primary-light dark:text-primary-dark font-medium">
                    {" "}
                    {item?.fuelType}
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-secondary-light dark:text-secondary-dark text-sm">
                  КПП:
                  <Text className="text-primary-light dark:text-primary-dark font-medium">
                    {" "}
                    {item?.transmission}
                  </Text>
                </Text>
              </View>
            </View>
          </React.Fragment>
        ))}

      {carData.length > 0 && (
        <EditCarModal
          visible={modalVisible}
          carData={carData[0]}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

export default CarInfo;
