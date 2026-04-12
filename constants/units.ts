export type UnitCategory = 'Length' | 'Weight' | 'Temperature';

export interface Unit {
  label: string;
  value: string;
  category: UnitCategory;
  ratio?: number; // Ratio to base unit (m, g)
}

export const Units: Unit[] = [
  // Length (Base: meters)
  { label: 'Millimeters (mm)', value: 'mm', category: 'Length', ratio: 0.001 },
  { label: 'Centimeters (cm)', value: 'cm', category: 'Length', ratio: 0.01 },
  { label: 'Meters (m)', value: 'm', category: 'Length', ratio: 1 },
  { label: 'Kilometers (km)', value: 'km', category: 'Length', ratio: 1000 },
  { label: 'Inches (in)', value: 'in', category: 'Length', ratio: 0.0254 },
  { label: 'Feet (ft)', value: 'ft', category: 'Length', ratio: 0.3048 },
  { label: 'Yards (yd)', value: 'yd', category: 'Length', ratio: 0.9144 },
  { label: 'Miles (mi)', value: 'mi', category: 'Length', ratio: 1609.34 },

  // Weight (Base: grams)
  { label: 'Milligrams (mg)', value: 'mg', category: 'Weight', ratio: 0.001 },
  { label: 'Grams (g)', value: 'g', category: 'Weight', ratio: 1 },
  { label: 'Kilograms (kg)', value: 'kg', category: 'Weight', ratio: 1000 },
  { label: 'Ounces (oz)', value: 'oz', category: 'Weight', ratio: 28.3495 },
  { label: 'Pounds (lb)', value: 'lb', category: 'Weight', ratio: 453.592 },

  // Temperature
  { label: 'Celsius (°C)', value: 'C', category: 'Temperature' },
  { label: 'Fahrenheit (°F)', value: 'F', category: 'Temperature' },
  { label: 'Kelvin (K)', value: 'K', category: 'Temperature' },
];
