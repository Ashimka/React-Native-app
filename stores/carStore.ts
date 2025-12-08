import { CarData } from "@/types/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CreateCarData = Omit<CarData, "id" | "createdAt">;

// Интерфейс состояния с методами управления
interface CarStore {
  // Основное состояние
  cars: CarData[];

  // Методы управления
  setCars: (cars: CarData[]) => void;
  addCar: (car: CreateCarData) => void;
  updateCar: (id: string, updates: Partial<CarData>) => void;
  removeCar: (id: string) => void;
  clearCars: () => void;
  getCarById: (id: string) => CarData | undefined;
}

const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const useCarStore = create<CarStore>()(
  persist(
    (set, get) => ({
      // Начальное состояние
      cars: [],

      // Метод установки полного массива машин
      setCars: (cars) => set({ cars }),

      // Метод добавления новой машины с автоматическим ID
      addCar: (carData) =>
        set((state) => {
          const newCar: CarData = {
            ...carData,
            id: generateId(),
            createdAt: new Date().toISOString(),
          };
          return {
            cars: [...state.cars, newCar],
          };
        }),

      // Метод обновления машины по ID
      updateCar: (id, updates) =>
        set((state) => ({
          cars: state.cars.map((car) =>
            car.id === id ? { ...car, ...updates } : car
          ),
        })),

      // Метод удаления машины по ID
      removeCar: (id) =>
        set((state) => ({
          cars: state.cars.filter((car) => car.id !== id),
        })),

      // Метод полной очистки
      clearCars: () => set({ cars: [] }),

      // Метод получения машины по ID
      getCarById: (id) => {
        const state = get();
        return state.cars.find((car) => car.id === id);
      },
    }),
    {
      name: "car-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
export default useCarStore;
