import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from "../../constants/images";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";

import { signIn } from "../../services/auth";

const SignIn = () => {
  // const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      return Alert.alert("Error", "Please fill in all fields");
    }
  
    setSubmitting(true);
  
    try {
      const response = await signIn(form.email, form.password);
      await AsyncStorage.setItem("token", response.token); // Save token to AsyncStorage
      
      Alert.alert("Success", "Logged in successfully!", [
        {
          text: "OK",
          onPress: () => router.replace("/home"), // Navigate only after clicking OK
        },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to sign in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-purple h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center  h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
        

          <Image
            source={images.icon}
            resizeMode="contain"
            className="w-[300px] h-[300px] mx-auto my-0"

          />

          <Text className="text-2xl font-semibold text-white mt-10 mb-8 font-psemibold">
            Let the challenge begin!
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;



