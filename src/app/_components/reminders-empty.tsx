import { ClockIcon } from "@/assets/icons";
import React from "react";
import { Text, View } from "react-native";
import { CreateReminderLink } from "./create-reminder-link";

export const RemindersEmpry = ({
  localHandler,
}: {
  localHandler: "home" | "remindersList";
}) => {
  return (
    <View
      className="bg-slate-300 mt-4 space-y-4 rounded-lg p-2 items-center justify-center py-4"

    >
      <ClockIcon size={30} />

      <Text className="text-sm mb-4">
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
