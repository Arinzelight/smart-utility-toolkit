import { Activity, CircleDollarSign, Ruler, LucideIcon } from 'lucide-react-native';

export interface Tool {
  title: string;
  description: string;
  icon: LucideIcon;
  route: string;
  themeKey: 'primary' | 'secondary' | 'tertiary';
}

export const DASHBOARD_TOOLS: Tool[] = [
  {
    title: 'Unit Converter',
    description: 'Convert length, weight, and temperature instantly.',
    icon: Ruler,
    route: '/unit-converter',
    themeKey: 'primary',
  },
  {
    title: 'Currency Converter',
    description: 'Real-time exchange rates for global currencies.',
    icon: CircleDollarSign,
    route: '/currency',
    themeKey: 'secondary',
  },
  {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and health status.',
    icon: Activity,
    route: '/health',
    themeKey: 'tertiary',
  },
];
