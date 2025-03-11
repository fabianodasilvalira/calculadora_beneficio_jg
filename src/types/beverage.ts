export interface VolumeOption {
  category: string;
  value: number;
  label: string;
}

export interface Beverage {
  id: string;
  description: string;
  volume: number;
  price: number;
}

export interface BeverageAnalysis extends Beverage {
  costPerLiter: number;
  isBestValue: boolean;
}

export const volumeOptions: VolumeOption[] = [
  {
    category: "Longneck (Garrafa Pequena)",
    value: 275,
    label: "275ml - Longneck Pequena"
  },
  {
    category: "Longneck (Garrafa Pequena)",
    value: 300,
    label: "300ml - Longneck Padrão"
  },
  {
    category: "Garrafa Tradicional",
    value: 355,
    label: "355ml - Garrafa Média"
  },
  {
    category: "Garrafa Tradicional",
    value: 600,
    label: "600ml - Garrafa Tradicional"
  },
  {
    category: "Lata",
    value: 269,
    label: "269ml - Mini Lata"
  },
  {
    category: "Lata",
    value: 350,
    label: "350ml - Lata Padrão"
  },
  {
    category: "Lata",
    value: 473,
    label: "473ml - Latão"
  },
  {
    category: "Latão/Garrafa de Litrão",
    value: 1000,
    label: "1L - Litrão"
  }
];