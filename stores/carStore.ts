import { CarData } from "@/types/auto";
import { create } from "zustand";

// Интерфейс состояния с методами управления
interface CarStore {
  // Основное состояние
  carData: CarData[];

  // Методы управления
  setCars: (cars: CarData[]) => void;
  addCar: (car: CarData) => void;
  updateCar: (index: number, updates: Partial<CarData>) => void;
  removeCar: (index: number) => void;
  clearCars: () => void;
}

const useCarStore = create<CarStore>((set) => ({
  // Начальное состояние
  carData: [],

  // Метод установки полного массива машин
  setCars: (cars) => set({ carData: cars }),

  // Метод установки полных данных о машине
  addCar: (car) =>
    set((state) => ({
      carData: [...state.carData, car],
    })),

  // Метод частичного обновления данных
  updateCar: (index, updates) =>
    set((state) => {
      const updatedCars = [...state.carData];
      updatedCars[index] = { ...updatedCars[index], ...updates };
      return { carData: updatedCars };
    }),

  // Метод удаления машины по индексу
  removeCar: (index) =>
    set((state) => ({
      carData: state.carData.filter((_, i) => i !== index),
    })),

  // Метод полной очистки массива
  clearCars: () => set({ carData: [] }),
}));
export default useCarStore;
