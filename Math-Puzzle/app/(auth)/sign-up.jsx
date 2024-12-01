import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import  images  from "../../constants/images";
import  CustomButton from "../../components/CustomButton";
import FormField  from "../../components/FormField";

import { signUp } from "../../services/auth";

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    // Check for empty fields
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
  
    // Validate password strength
    const passwordMinLength = 6;
    if (form.password.length < passwordMinLength) {
      Alert.alert(
        "Error",
        `Password must be at least ${passwordMinLength} characters long`
      );
      return;
    }
  
    // Additional password validation: contains a number and special character
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!numberRegex.test(form.password) || !specialCharRegex.test(form.password)) {
      Alert.alert(
        "Error",
        "Password must include at least one number and one special character"
      );
      return;
    }
  
    // Proceed with signup if validation passes
    setSubmitting(true);
    try {
      const data = await signUp(form.username, form.email, form.password);
      Alert.alert("Success", "Registered successfully!", [
        {
          text: "OK",
          onPress: () => router.replace("/sign-in"), // Navigate only after clicking OK
        },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-purple h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.icon}
            resizeMode="contain"
             className="w-[300px] h-[300px] mx-auto my-0"
          />

          <Text className="text-2xl font-semibold text-white mt-1 mb-8 font-psemibold">
          Sign up to get started!
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
