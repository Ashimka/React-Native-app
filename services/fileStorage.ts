import { CarData } from "@/types/auto";
import * as FileSystem from "expo-file-system/legacy";
import { Alert } from "react-native";

const FILE_NAME = "cars_data.json";

// Создаем полный URI к файлу
const getFileUri = (): string | null => {
  try {
    // Получаем директорию документов
    const documentDir = FileSystem.documentDirectory;

    if (!documentDir) {
      console.error("❌ Document directory не доступен");
      return null;
    }

    // Создаем путь к файлу
    return `${documentDir}${FILE_NAME}`;
  } catch (error) {
    console.error("❌ Ошибка получения пути:", error);
    return null;
  }
};

const fileStorageService = {
  // Сохранение данных
  async saveCars(cars: CarData[]): Promise<boolean> {
    try {
      const fileUri = getFileUri();

      if (!fileUri) {
        Alert.alert("Ошибка", "Не удалось получить доступ к файловой системе");
        return false;
      }

      const jsonString = JSON.stringify(cars, null, 2);

      // Проверяем существование директории
      const dirUri = fileUri.substring(0, fileUri.lastIndexOf("/"));
      const dirInfo = await FileSystem.getInfoAsync(dirUri);

      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
      }

      // Записываем файл (encoding по умолчанию UTF-8)
      await FileSystem.writeAsStringAsync(fileUri, jsonString);

      console.log("✅ Данные сохранены в:", fileUri);
      return true;
    } catch (error) {
      console.error("❌ Ошибка сохранения:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Alert.alert("Ошибка", `Не удалось сохранить данные: ${errorMessage}`);
      return false;
    }
  },

  // Загрузка данных
  async loadCars(): Promise<CarData[] | null> {
    try {
      const fileUri = getFileUri();

      if (!fileUri) {
        return [];
      }

      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (!fileInfo.exists) {
        console.log("ℹ️ Файл не существует, создаем новый");
        return [];
      }

      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      const cars = JSON.parse(fileContent) as CarData[];

      console.log("✅ Данные загружены, найдено машин:", cars.length);
      return cars;
    } catch (error) {
      console.error("❌ Ошибка загрузки:", error);
      Alert.alert("Ошибка", "Не удалось загрузить данные");
      return null;
    }
  },

  // Очистка данных
  async clearData(): Promise<boolean> {
    try {
      const fileUri = getFileUri();

      if (!fileUri) {
        return false;
      }

      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (fileInfo.exists) {
        await FileSystem.deleteAsync(fileUri);
        console.log("✅ Файл удален");
        return true;
      }

      return true;
    } catch (error) {
      console.error("❌ Ошибка удаления:", error);
      return false;
    }
  },

  // Получение информации о файле
  async getFileInfo() {
    try {
      const fileUri = getFileUri();

      if (!fileUri) {
        return null;
      }

      return await FileSystem.getInfoAsync(fileUri);
    } catch (error) {
      console.error("Ошибка получения информации о файле:", error);
      return null;
    }
  },

  // Получение пути к файлу для отладки
  getFilePath(): string | null {
    return getFileUri();
  },
};

export default fileStorageService;
