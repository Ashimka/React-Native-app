import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/Button";
import { icons } from "@/constants/icons";

import fileStorageService from "@/services/fileStorage";

import AddPostModal from "@/components/AddPostModal";
import AuthModal from "@/components/AuthModal";
import {
  authServiceLogin,
  authServiceVerifyCode,
} from "@/services/auth/auth.service";
import { tokenService } from "@/services/auth/token.service";
import useCarStore from "@/stores/carStore";

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [idCar, setIdCar] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modalAuthVisible, setModalAuthVisible] = useState(false);

  const { cars, clearCars } = useCarStore();

  const openModal = (id: string) => {
    setModalVisible(true);
    setIdCar(id);
  };

  const getAllCars = async () => {
    const allCars = await fileStorageService.loadCars();
    setIsAuthenticated(false);

    console.log({ allCars });
  };

  const deleteAllCars = async () => {
    clearCars();
    await fileStorageService.clearData();
  };

  const handleAuthenticate = () => {
    // Открываем модальное окно авторизации (ввод email для отправки кода)
    setModalAuthVisible(true);
  };

  const handleSendCode = async (email: string) => {
    await authServiceLogin({ email });
    console.log("Send code to:", email);
  };

  const handleVerifyCode = async (email: string, code: string) => {
    const result = await authServiceVerifyCode(email, code);
    console.log("Verify code result:", result);

    if (result?.tokens) {
      const { accessToken, refreshToken } = result.tokens;
      if (accessToken && refreshToken) {
        // Сохранить refresh token в SecureStore
        await tokenService.saveRefreshToken(refreshToken);
        // Сохранить access token в памяти
        tokenService.saveAccessToken(accessToken);
        console.log("Tokens saved successfully");
      } else {
        console.warn("Access or refresh token not found in response");
      }
    } else {
      console.warn("Tokens object not found in response");
    }

    setIsAuthenticated(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-600 pt-5">
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <View className="flex-row items-center justify-between">
          <Image source={icons.logo} className="size-10" />
          {isAuthenticated ? (
            <Image source={icons.auto} className="size-10 rounded-full" />
          ) : (
            <Text
              onPress={handleAuthenticate}
              className="text-xl font-bold text-surface-light"
            >
              Войти
            </Text>
          )}
        </View>
        <View className="flex-col gap-2 mt-3">
          {cars.map((item) => (
            <React.Fragment key={item.id}>
              <View className="bg-surface-light dark:bg-surface-dark rounded-lg p-4 my-3 border border-border-light dark:border-border-dark">
                <View className="flex-row items-center gap-4 mb-4">
                  <Text className="text-surface-light text-lg">{item.car}</Text>
                  <Text className="text-surface-light">{item.year} г</Text>
                </View>
                <Button
                  onPress={() => openModal(item.id)}
                  label="Добавить запись"
                  size="small"
                  theme="light"
                />
              </View>
            </React.Fragment>
          ))}
        </View>
        <View className="mt-4 gap-4">
          <Button onPress={getAllCars} label="Get auto" theme="primary" />
          <Button onPress={deleteAllCars} label="Delete all" theme="primary" />
        </View>
        {modalVisible && (
          <AddPostModal
            visible={modalVisible}
            carId={idCar}
            onClose={() => setModalVisible(false)}
          />
        )}
        <AuthModal
          visible={modalAuthVisible}
          onClose={() => setModalAuthVisible(false)}
          onSend={handleSendCode}
          onVerify={handleVerifyCode}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
