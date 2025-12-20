import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { PostData } from "@/types/auto";
import BaseModal from "./BaseModal";

interface AddPostModalProps {
  visible: boolean;
  carId: string;
  onClose: () => void;
}

const AddPostModal = ({ visible, carId, onClose }: AddPostModalProps) => {
  const [modalPostData, setModalPostData] = useState<PostData>({
    carId,
    type: "",
    description: "",
    createdAt: new Date().toISOString(),
  });
  const [openPostType, setOpenPostType] = useState(false);
  const [valuePostType, setValuePostType] = useState<string | null>(null);
  const [postType, setPostType] = useState([
    { label: "Заправка", value: "Заправка" },
    { label: "Ремонт", value: "Ремонт" },
    { label: "ТО", value: "ТО" },
  ]);

  useEffect(() => {
    if (!visible) {
      // Сброс состояния при закрытии модального окна
      setModalPostData({
        carId,
        type: "",
        description: "",
        createdAt: new Date().toISOString(),
      });
      setValuePostType(null);
      setOpenPostType(false);
    }
  }, [visible, carId]);

  const handleSavePost = async () => {
    console.log({ modalPostData });
    onClose();
  };

  return (
    <BaseModal
      visible={visible}
      title="Новая запись"
      onClose={onClose}
      onConfirm={handleSavePost}
      confirmText="Сохранить"
    >
      <View style={{ zIndex: 3000, marginBottom: 16 }}>
        <DropDownPicker
          open={openPostType}
          value={valuePostType}
          items={postType}
          setOpen={setOpenPostType}
          setValue={(callback) => {
            const newValue = callback(valuePostType);
            setValuePostType(newValue);
            setModalPostData({ ...modalPostData, type: newValue || "" });
          }}
          setItems={setPostType}
          placeholder="Тип записи"
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
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#E6E7EB",
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          minHeight: 100,
          textAlignVertical: "top",
        }}
        multiline={true}
        numberOfLines={4}
        value={modalPostData.description}
        onChangeText={(post) => {
          setModalPostData({ ...modalPostData, description: post });
        }}
        placeholder="Замена масла..."
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#E6E7EB",
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
        }}
        value={modalPostData.cost?.toString() || ""}
        onChangeText={(cost) => {
          const newCost = cost ? parseInt(cost, 10) : undefined;
          setModalPostData({ ...modalPostData, cost: newCost });
        }}
        placeholder="Стоимость"
        keyboardType="numeric"
      />
    </BaseModal>
  );
};

export default AddPostModal;
