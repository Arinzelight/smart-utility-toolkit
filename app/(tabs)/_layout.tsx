import { Tabs } from 'expo-router';
import React from 'react';
import { View, Platform } from 'react-native';
import { LayoutGrid, Ruler, CircleDollarSign, Activity, ListTodo } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const isAndroid = Platform.OS === 'android';

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: isAndroid ? '#000000' : theme.background, 
      paddingBottom: isAndroid ? insets.bottom : 0 
    }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSecondary,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            backgroundColor: theme.card,
            borderTopColor: theme.border,
            height: isAndroid ? 60 : 60 + insets.bottom,
            paddingBottom: isAndroid ? 4 : insets.bottom,
            paddingTop: 8,
            elevation: 0,
            borderBottomWidth: 0,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size }) => <LayoutGrid size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            title: 'Tasks',
            tabBarIcon: ({ color, size }) => <ListTodo size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="unit-converter"
          options={{
            title: 'Units',
            tabBarIcon: ({ color, size }) => <Ruler size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="currency"
          options={{
            title: 'Currency',
            tabBarIcon: ({ color, size }) => <CircleDollarSign size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="health"
          options={{
            title: 'Health',
            tabBarIcon: ({ color, size }) => <Activity size={size} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}


