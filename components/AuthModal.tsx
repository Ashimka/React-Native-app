import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import BaseModal from "./BaseModal";

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onSend: (email: string) => Promise<void> | void;
  onVerify?: (email: string, code: string) => Promise<void> | void;
}

const AuthModal = ({ visible, onClose, onSend, onVerify }: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "sending" | "code">("email");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) {
      setEmail("");
      setCode("");
      setStep("email");
      setLoading(false);
      setErrorMessage(null);
    }
  }, [visible]);

  const validateEmail = (value: string) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const handleConfirm = async () => {
    if (loading) return;
    if (step === "email") {
      if (!email) {
        Alert.alert("Ошибка", "Введите email");
        return;
      }

      if (!validateEmail(email)) {
        Alert.alert("Ошибка", "Введите корректный email");
        return;
      }

      try {
        setLoading(true);
        setErrorMessage(null);
        setStep("sending");
        await onSend(email);
        setStep("code");
      } catch (error: any) {
        // console.error("Ошибка отправки кода", error);
        // Попробуем извлечь текст ошибки от сервера
        const serverMsg =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          (typeof error?.response?.data === "string"
            ? error.response.data
            : null) ||
          error?.message ||
          "Не удалось отправить код. Попробуйте позже";
        setErrorMessage(String(serverMsg));
        setStep("email");
      } finally {
        setLoading(false);
      }
    } else if (step === "code") {
      if (!code) {
        Alert.alert("Ошибка", "Введите код");
        return;
      }
      try {
        setLoading(true);
        setErrorMessage(null);
        if (onVerify) {
          await onVerify(email, code);
        }
        // после успешной проверки можно закрывать модалку
        onClose();
      } catch (err: any) {
        // console.error("Ошибка верификации кода", err);
        const serverMsg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          (typeof err?.response?.data === "string"
            ? err.response.data
            : null) ||
          err?.message ||
          "Неверный код или проблема сети";
        setErrorMessage(String(serverMsg));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <BaseModal
      visible={visible}
      title="Авторизация"
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmText={
        loading
          ? "Пожалуйста подождите"
          : step === "email"
            ? "Дальше"
            : step === "code"
              ? "Подтвердить код"
              : ""
      }
    >
      <View>
        {step === "email" && (
          <>
            <Text className="text-sm text-surface-dark mb-2">
              Введите Ваш Email
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E6E7EB",
                borderRadius: 8,
                padding: 12,
                marginBottom: 8,
              }}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </>
        )}
        {step === "sending" && (
          <Text className="text-base text-center py-4">Отправляется…</Text>
        )}
        {step === "code" && (
          <>
            <Text className="text-sm text-surface-dark mb-2">
              Введите код из письма
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E6E7EB",
                borderRadius: 8,
                padding: 12,
                marginBottom: 8,
              }}
              value={code}
              onChangeText={setCode}
              placeholder="123456"
              keyboardType="numeric"
            />
            <Text
              className="text-sm text-primary-light text-center mt-2"
              onPress={() => {
                // возвращаемся на шаг ввода email, очищаем код и сообщение об ошибке
                setStep("email");
                setCode("");
                setErrorMessage(null);
              }}
            >
              Получить новый код
            </Text>
          </>
        )}
        {errorMessage ? (
          <Text className="text-sm text-red-500 mt-2">{errorMessage}</Text>
        ) : null}
      </View>
    </BaseModal>
  );
};

export default AuthModal;
