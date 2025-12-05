import { CarData } from "@/types/auto";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

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

const CarInfo = ({ car, onEdit, onPress }: CarInfoProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<CarData | null>(null);
  const [openFuel, setOpenFuel] = useState(false);
  const [openTr, setOpenTr] = useState(false);
  const [valueFuel, setValueFuel] = useState<string | null>(null);
  const [valueTransmission, setValueTransmission] = useState<string | null>(
    null
  );

  const [carData, setCarData] = useState<CarData[]>([
    {
      car,
      year: 0,
      mileage: 0,
      color: "Белый",
      fuelType: "Бензин",
      transmission: "Ручная",
    },
  ]);
  const [carFuelType, setCarFuelType] = useState([
    { label: "Бензин", value: "Бензин" },
    { label: "Гибрид", value: "Гибрид" },
    { label: "Дизель", value: "Дизель" },
    { label: "Электро", value: "Электро" },
  ]);

  const [carTransmissionType, setCarTransmissionType] = useState([
    { label: "Автомат", value: "Автомат" },
    { label: "Вариатор", value: "Вариатор" },
    { label: "Механика", value: "Механика" },
    { label: "Типтроник", value: "Типтроник" },
  ]);

  const handleOpenModal = (auto: CarData) => {
    setModalData(auto);
    setValueFuel(auto.fuelType || null);
    setValueTransmission(auto.transmission || null);
    setModalVisible(true);
  };

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

      {/* Модальное окно для редактирования */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white px-6 rounded-lg w-80">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-xl">Редактирование</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-primary-light text-xl p-2">&#10006;</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#E6E7EB",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                }}
                value={modalData?.car || ""}
                onChangeText={(car) => {
                  if (modalData) {
                    setModalData({ ...modalData, car });
                  }
                }}
                placeholder="Марка"
              />

              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#E6E7EB",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                }}
                value={modalData?.color || ""}
                onChangeText={(color) => {
                  if (modalData) {
                    setModalData({ ...modalData, color });
                  }
                }}
                placeholder="Цвет"
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#E6E7EB",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                }}
                value={modalData?.mileage?.toString() || ""}
                onChangeText={(text) => {
                  if (modalData) {
                    const mileage = text ? parseInt(text, 10) : undefined;
                    setModalData({ ...modalData, mileage });
                  }
                }}
                placeholder="Пробег"
                keyboardType="numeric"
              />

              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#E6E7EB",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 24,
                }}
                value={modalData?.year?.toString() || ""}
                onChangeText={(text) => {
                  if (modalData) {
                    const year = text ? parseInt(text, 10) : undefined;
                    setModalData({ ...modalData, year });
                  }
                }}
                placeholder="Год выпуска"
                keyboardType="numeric"
              />

              <View style={{ zIndex: 3000, marginBottom: 16 }}>
                <DropDownPicker
                  open={openFuel}
                  value={valueFuel}
                  items={carFuelType}
                  setOpen={(open) => {
                    const newOpen =
                      typeof open === "function" ? open(openFuel) : open;
                    setOpenFuel(newOpen);
                    if (newOpen) {
                      setOpenTr(false);
                    }
                  }}
                  setValue={(callback) => {
                    const newValue = callback(valueFuel);
                    setValueFuel(newValue);
                    if (modalData) {
                      setModalData({ ...modalData, fuelType: newValue || "" });
                    }
                  }}
                  setItems={setCarFuelType}
                  placeholder="Тип топлива"
                  zIndex={3000}
                  zIndexInverse={1000}
                  style={{
                    backgroundColor: "#fafafa",
                    borderColor: "#ccc",
                  }}
                  dropDownContainerStyle={{
                    backgroundColor: "#fafafa",
                    borderColor: "#ccc",
                  }}
                  textStyle={{
                    fontSize: 16,
                  }}
                />
              </View>
              <View style={{ zIndex: 2000 }}>
                <DropDownPicker
                  open={openTr}
                  value={valueTransmission}
                  items={carTransmissionType}
                  setOpen={(open) => {
                    const newOpen =
                      typeof open === "function" ? open(openTr) : open;
                    setOpenTr(newOpen);
                    if (newOpen) {
                      setOpenFuel(false);
                    }
                  }}
                  setValue={(callback) => {
                    const newValue = callback(valueTransmission);
                    setValueTransmission(newValue);
                    if (modalData) {
                      setModalData({
                        ...modalData,
                        transmission: newValue || "",
                      });
                    }
                  }}
                  setItems={setCarTransmissionType}
                  placeholder="Тип КПП"
                  zIndex={2000}
                  zIndexInverse={1000}
                  style={{
                    backgroundColor: "#fafafa",
                    borderColor: "#ccc",
                  }}
                  dropDownContainerStyle={{
                    backgroundColor: "#fafafa",
                    borderColor: "#ccc",
                  }}
                  textStyle={{
                    fontSize: 16,
                  }}
                />
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#0B5FFF",
                  padding: 16,
                  borderRadius: 8,
                  alignItems: "center",
                  marginTop: 12,
                  marginBottom: 12,
                }}
                onPress={() => {
                  if (modalData) {
                    setCarData((prev) =>
                      prev.map((item) =>
                        item.car === modalData.car ? modalData : item
                      )
                    );
                  }
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>
                  Сохранить
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CarInfo;
