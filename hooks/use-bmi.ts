import { useState, useCallback } from 'react';

export type BMIUnit = 'metric' | 'imperial';

export interface BMIResult {
  bmi: number;
  category: string;
  colorMode: 'info' | 'success' | 'warning' | 'error';
}

export const useBMI = () => {
  const [unit, setUnit] = useState<BMIUnit>('imperial');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>(''); // cm in metric
  const [heightFt, setHeightFt] = useState<string>(''); // ft in imperial
  const [heightIn, setHeightIn] = useState<string>(''); // in in imperial

  const calculate = useCallback((): BMIResult | null => {
    let w = parseFloat(weight);
    let h = 0;

    if (isNaN(w) || w <= 0) return null;

    if (unit === 'metric') {
      h = parseFloat(height) / 100; // cm to m
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      h = (ft * 12 + inch) * 0.0254; // ft+in to meters (weight is always kg)
    }

    if (isNaN(h) || h <= 0) return null;

    const bmiValue = w / (h * h);
    let category = '';
    let colorMode: 'info' | 'success' | 'warning' | 'error' = 'success';

    if (bmiValue < 18.5) {
      category = 'Underweight';
      colorMode = 'info';
    } else if (bmiValue < 25) {
      category = 'Normal';
      colorMode = 'success';
    } else if (bmiValue < 30) {
      category = 'Overweight';
      colorMode = 'warning';
    } else {
      category = 'Obese';
      colorMode = 'error';
    }

    return { bmi: parseFloat(bmiValue.toFixed(1)), category, colorMode };
  }, [unit, weight, height, heightFt, heightIn]);

  return {
    unit,
    setUnit,
    weight,
    setWeight,
    height,
    setHeight,
    heightFt,
    setHeightFt,
    heightIn,
    setHeightIn,
    result: calculate(),
  };
};
