import { useState, useCallback } from 'react';
import { Units, UnitCategory } from '@/constants/units';

/** Default unit pairs per category so dropdowns are never stale after a switch */
const CATEGORY_DEFAULTS: Record<UnitCategory, [string, string]> = {
  Length: ['m', 'cm'],
  Weight: ['kg', 'g'],
  Temperature: ['C', 'F'],
};

export const useUnitConverter = () => {
  const [value, setValue] = useState<string>('');
  const [category, setCategory] = useState<UnitCategory>('Length');
  const [fromUnit, setFromUnit] = useState<string>(CATEGORY_DEFAULTS.Length[0]);
  const [toUnit, setToUnit] = useState<string>(CATEGORY_DEFAULTS.Length[1]);

  /** Switches category and resets units to sensible defaults automatically */
  const changeCategory = useCallback((next: UnitCategory) => {
    setCategory(next);
    setFromUnit(CATEGORY_DEFAULTS[next][0]);
    setToUnit(CATEGORY_DEFAULTS[next][1]);
    setValue(''); // clear value so stale result doesn't flash
  }, []);

  const convert = useCallback((): string => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';

    if (category === 'Temperature') {
      let celsius = numValue;
      if (fromUnit === 'F') celsius = (numValue - 32) * (5 / 9);
      else if (fromUnit === 'K') celsius = numValue - 273.15;

      if (toUnit === 'F') return (celsius * (9 / 5) + 32).toFixed(2);
      if (toUnit === 'K') return (celsius + 273.15).toFixed(2);
      return celsius.toFixed(2);
    }

    const fromRatio = Units.find((u) => u.value === fromUnit)?.ratio ?? 1;
    const toRatio = Units.find((u) => u.value === toUnit)?.ratio ?? 1;
    const result = (numValue * fromRatio) / toRatio;

    return result.toLocaleString(undefined, { maximumFractionDigits: 4 });
  }, [value, fromUnit, toUnit, category]);

  return {
    value,
    setValue,
    category,
    changeCategory,  // expose instead of raw setCategory
    fromUnit,
    setFromUnit,
    toUnit,
    setToUnit,
    result: convert(),
    availableUnits: Units.filter((u) => u.category === category),
  };
};
