import {Stack } from "expo-router";
import { View, Text, Image } from 'react-native'
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

import  icons  from "../../constants/icons";
// import { Loader } from "../../components";

// Prevent the splash screen from auto-hiding before asset loading is complete.

const TabsLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
   
    </Stack>
  )
  
}

export default TabsLayout