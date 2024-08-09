import React from "react";
import { Text, View } from "react-native";
import { CreateReminderLink } from "./create-reminder-link";
import { ClockIcon } from "@/assets/icons";

export const RemindersEmpry = ({
  localHandler,
}: {
  localHandler: "home" | "remindersList";
}) => {
  return (
    <View className="mt-4 space-y-4 border border-slate-300 rounded-lg p-2 items-center justify-center">
      <ClockIcon size={30} />

      <Text className="text-sm text-slate-600 mb-4">
        Não há lembretes{" "}
        {localHandler === "home"
          ? "para hoje"
          : localHandler === "remindersList" && "criados"}
        , deseja criar um agora?
      </Text>

      <CreateReminderLink />
    </View>
  );
};
