export interface Model {
  model: string;
}

export interface Brand {
  brand: string;
  popular?: boolean;
  models: Model[];
}
