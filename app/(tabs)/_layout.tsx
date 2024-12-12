import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { RFValue } from "react-native-responsive-fontsize"
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const ICONS_SIZE = 24;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            borderTopWidth: 1.5, 
            borderTopColor: colorScheme == "dark" ? '#fff' :'#00A86B', 
          },
          default: {
            height: 60,
            borderTopWidth: 2,
            borderTopColor: '#00A86B', 
            borderColor: colorScheme == "dark" ? '#fff' :'#00A86B',
          },
        }),
        tabBarLabelStyle: {
          fontSize: RFValue(9), 
        },
        
        
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={ICONS_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="historical"
        options={{
          title: 'Histórico',
          headerShown: true,
          tabBarIcon: ({ color }) => <Entypo name="leaf" size={ICONS_SIZE} color={color} />,
          headerStyle: {
            height: 110
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold', 
          },
        }}
      />
      <Tabs.Screen
        name="points"
        options={{
          title: 'Pontos',
          headerShown: true,
          tabBarIcon: ({ color }) => <AntDesign name="Trophy" size={ICONS_SIZE} color={color} />,
          headerStyle: {
            height: 110
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold', 
          },
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Reconhecer',
          tabBarIcon: ({ color }) => <Feather name="camera" size={ICONS_SIZE} color={color} />,
        }}
      />
    </Tabs>
  );
}
