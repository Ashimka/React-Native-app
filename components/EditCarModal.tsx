import useCarStore from "@/stores/carStore";
import { CarData } from "@/types/auto";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import BaseModal from "./BaseModal";

interface EditCarModalProps {
  visible: boolean;
  carData: CarData | null;
  onClose: () => void;
  onSave: (data: CarData) => void;
}

const EditCarModal = ({
  visible,
  carData,
  onClose,
  onSave,
}: EditCarModalProps) => {
  const [modalData, setModalData] = useState<CarData | null>(carData);
  const [openFuel, setOpenFuel] = useState(false);
  const [openTr, setOpenTr] = useState(false);
  const [valueFuel, setValueFuel] = useState<string | null>(null);
  const [valueTransmission, setValueTransmission] = useState<string | null>(
    null
  );

  const { updateCar, carData: storeCarData } = useCarStore();

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

  React.useEffect(() => {
    if (carData) {
      setModalData(carData);
      setValueFuel(carData.fuelType || null);
      setValueTransmission(carData.transmission || null);
    }
  }, [carData]);

  const handleSave = () => {
    if (modalData && carData) {
      // Находим индекс машины в сторе по исходному названию
      const carIndex = storeCarData.findIndex(
        (item) => item.car === carData.car
      );

      if (carIndex !== -1) {
        // Вычисляем обновления (только измененные поля)
        const updates: Partial<CarData> = {
          car: modalData.car,
          year: modalData.year,
          mileage: modalData.mileage,
          color: modalData.color,
          fuelType: modalData.fuelType,
          transmission: modalData.transmission,
        };
        updateCar(carIndex, updates);
      }

      onSave(modalData);
      onClose();
    }
  };

  return (
    <BaseModal
      visible={visible}
      title="Редактирование"
      onClose={onClose}
      onConfirm={handleSave}
      confirmText="Сохранить"
    >
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
            const newOpen = typeof open === "function" ? open(openFuel) : open;
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
            const newOpen = typeof open === "function" ? open(openTr) : open;
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
    </BaseModal>
  );
};

export default EditCarModal;
