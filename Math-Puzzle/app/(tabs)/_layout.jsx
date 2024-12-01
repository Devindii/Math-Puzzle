import {Stack } from "expo-router";

// import { Loader } from "../../components";


const TabsLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="instructions" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="leaderboard" options={{ headerShown: false }} />
        <Stack.Screen name="easyGame" options={{ headerShown: false }} />
        <Stack.Screen name="normalGame" options={{ headerShown: false }} />
        <Stack.Screen name="hardGame" options={{ headerShown: false }} />
      
   
    </Stack>
  )
  
}

export default TabsLayout