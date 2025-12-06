import React, { ReactNode } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface BaseModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  children: ReactNode;
}

const BaseModal = ({
  visible,
  title,
  onClose,
  onConfirm,
  confirmText = "Сохранить",
  children,
}: BaseModalProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white px-6 rounded-lg w-80">
          {/* Заголовок с иконкой закрытия */}
          <View className="flex-row justify-between items-center my-4">
            <Text className="text-xl">{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-primary-light text-xl p-2">&#10006;</Text>
            </TouchableOpacity>
          </View>

          {/* Основной контент */}
          <View>{children}</View>

          {/* Кнопка подтверждения */}
          <TouchableOpacity
            style={{
              backgroundColor: "#0B5FFF",
              padding: 16,
              borderRadius: 8,
              alignItems: "center",
              marginTop: 20,
              marginBottom: 25,
            }}
            onPress={onConfirm}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              {confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BaseModal;
