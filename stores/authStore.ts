import { tokenService } from "@/services/auth/token.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  // добавьте другие поля пользователя, если нужны
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;

  // actions
  login: (
    tokens: { accessToken: string; refreshToken: string },
    user?: User,
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,

      login: async (
        tokens: { accessToken: string; refreshToken: string },
        user: User | null = null,
      ) => {
        // Сохранить токены в соответствующие хранилища
        await tokenService.saveRefreshToken(tokens.refreshToken);
        tokenService.saveAccessToken(tokens.accessToken);

        set({
          isAuthenticated: true,
          user,
          accessToken: tokens.accessToken,
        });
      },

      logout: async () => {
        // Очистить токены
        await tokenService.clearTokens();

        set({
          isAuthenticated: false,
          user: null,
          accessToken: null,
        });
      },

      refreshToken: async () => {
        try {
          const refreshToken = await tokenService.getRefreshToken();
          if (!refreshToken) return false;

          // Здесь должен быть API вызов для refresh (например, POST /auth/refresh)
          // Пока заглушка — предполагаем, что refresh всегда успешен и возвращает новые токены
          // const response = await axios.post('/auth/refresh', { refreshToken });
          // const { accessToken, refreshToken: newRefreshToken } = response.data;

          // Заглушка: генерируем новый accessToken (в реальности — из API)
          const newAccessToken = "new_access_token_" + Date.now();
          const newRefreshToken = refreshToken; // или новый из API

          // Сохранить новые токены
          await tokenService.saveRefreshToken(newRefreshToken);
          tokenService.saveAccessToken(newAccessToken);

          set({
            accessToken: newAccessToken,
            isAuthenticated: true,
          });

          return true;
        } catch (error) {
          console.error("Refresh token failed:", error);
          // Если refresh провалился, выйти
          await get().logout();
          return false;
        }
      },

      checkAuth: async () => {
        const refreshToken = await tokenService.getRefreshToken();
        if (refreshToken) {
          // Попытаться refresh при старте
          const success = await get().refreshToken();
          if (!success) {
            console.log("Auth check failed, user not authenticated");
          }
        } else {
          console.log("No refresh token, user not authenticated");
        }
      },
    }),
    {
      name: "auth-storage", // ключ в AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
      // persist только isAuthenticated, user; токены в SecureStore
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        // accessToken не persist, так как в памяти
      }),
    },
  ),
);
