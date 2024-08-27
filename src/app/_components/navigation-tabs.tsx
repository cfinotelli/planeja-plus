import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { NavTab } from "./nav-tab";

export const NavigationTabs = () => {
  return (
    <View className="flex-row flex-1 justify-between items-center space-x-2">
      <Link
        href={{
          pathname: "/lists/all",
        }}
        asChild
      >
        <NavTab label="Listas" />
      </Link>

      <Link
        href={{
          pathname: "/reminders/all",
        }}
        asChild
      >
        <NavTab label="Lembretes" />
      </Link>
    </View>
  );
};
