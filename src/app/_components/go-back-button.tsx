import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useNavigation } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import colors from "tailwindcss/colors";

export const GoBackButton = () => {
  const navigation = useNavigation();
  const handleGoBack = () => navigation.goBack();

  return (
    <TouchableOpacity
      className="p-2 bg-slate-700 rounded-md w-8 h-8"
      onPress={handleGoBack}
    >
      <SimpleLineIcons name="arrow-left" size={16} color={colors.slate[200]} />
    </TouchableOpacity>
  );
};
