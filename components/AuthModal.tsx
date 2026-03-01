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

  useEffect(() => {
    if (!visible) {
      setEmail("");
      setCode("");
      setStep("email");
      setLoading(false);
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
        setStep("sending");
        await onSend(email);
        setStep("code");
      } catch (error) {
        console.error("Ошибка отправки кода", error);
        Alert.alert("Ошибка", "Не удалось отправить код. Попробуйте позже");
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
        if (onVerify) {
          await onVerify(email, code);
        }
        // после успешной проверки можно закрывать модалку
        onClose();
      } catch (err) {
        console.error("Ошибка верификации кода", err);
        Alert.alert("Ошибка", "Неверный код или проблема сети");
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
              ? "Войти"
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
          </>
        )}
      </View>
    </BaseModal>
  );
};

export default AuthModal;
