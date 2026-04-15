import { Activity, CircleDollarSign, Ruler, LucideIcon, ListTodo } from 'lucide-react-native';

export interface Tool {
  title: string;
  description: string;
  icon: LucideIcon;
  route: string;
  themeKey: 'primary' | 'secondary' | 'tertiary' | 'info';
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
  {
    title: 'Task Manager',
    description: 'Track and manage your daily tasks efficiently.',
    icon: ListTodo,
    route: '/tasks',
    themeKey: 'info',
  },
];
