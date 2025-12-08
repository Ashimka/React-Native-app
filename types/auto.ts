export interface Model {
  model: string;
}

export interface Brand {
  brand: string;
  popular?: boolean;
  models: Model[];
}
export interface CarData {
  id: string;
  car: string;
  year?: number;
  mileage?: number;
  color?: string;
  fuelType?: string;
  transmission?: string;
  createdAt?: string;
}
