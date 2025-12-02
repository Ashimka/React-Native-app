import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CarInfoProps {
  car: string;
  year?: number;
  mileage?: number;
  color?: string;
  fuelType?: string;
  transmission?: string;
  onEdit?: () => void;
  onPress?: () => void;
}

const CarInfo = ({
  car,
  year = 2015,
  mileage = 150000,
  color = "Белый",
  fuelType = "Бензин",
  transmission = "Ручная",
  onEdit,
  onPress,
}: CarInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    setIsEditing(false);
    // Сохранение данных
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Отмена изменений
  };

  return (
    <View className="bg-surface-light dark:bg-surface-dark rounded-lg p-4 my-3 border border-border-light dark:border-border-dark">
      {/* Заголовок с брендом и кнопкой редактирования */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold text-surface-light">{car}</Text>
            <TouchableOpacity onPress={handleEdit}>
              <AntDesign name="edit" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <Text className="text-secondary-light dark:text-secondary-dark text-sm">
            {year} год выпуска
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
              {mileage.toLocaleString()} км
            </Text>
          </Text>
        </View>

        {/* Цвет */}
        <View className="flex-row items-center">
          <Text className="text-secondary-light dark:text-secondary-dark text-sm">
            Цвет:
            <Text className="text-primary-light dark:text-primary-dark font-medium">
              {" "}
              {color}
            </Text>
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-secondary-light dark:text-secondary-dark text-sm">
            Топливо:
            <Text className="text-primary-light dark:text-primary-dark font-medium">
              {" "}
              {fuelType}
            </Text>
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-secondary-light dark:text-secondary-dark text-sm">
            КПП:
            <Text className="text-primary-light dark:text-primary-dark font-medium">
              {" "}
              {transmission}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CarInfo;
