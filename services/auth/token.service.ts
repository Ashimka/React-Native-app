import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const tokenService = {
  // Сохранить refresh token в SecureStore
  async saveRefreshToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error("Ошибка сохранения refresh token:", error);
      throw error;
    }
  },

  // Получить refresh token из SecureStore
  async getRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("Ошибка получения refresh token:", error);
      return null;
    }
  },

  // Удалить refresh token из SecureStore
  async removeRefreshToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("Ошибка удаления refresh token:", error);
    }
  },

  // Сохранить access token в памяти (in-memory)
  saveAccessToken(token: string): void {
    // Храним в памяти, например, в переменной или в контексте
    // Для простоты используем глобальную переменную
    global.accessToken = token;
  },

  // Получить access token из памяти
  getAccessToken(): string | null {
    return global.accessToken || null;
  },

  // Удалить access token из памяти
  removeAccessToken(): void {
    delete global.accessToken;
  },

  // Очистить все токены
  async clearTokens(): Promise<void> {
    await this.removeRefreshToken();
    this.removeAccessToken();
  },
};
