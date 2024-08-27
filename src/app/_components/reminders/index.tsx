import { ScrollView } from "react-native";

import React from "react";
import { useRepoStore } from "@/stories/repo/repo-store";
import { AfterReminders } from "./_components/after-reminders";
import { BeforeReminders } from "./_components/before-reminders";

export const Reminders = () => {
  const { reminders } = useRepoStore((state) => state);
  return (
    <ScrollView>
      <AfterReminders reminders={reminders} />

      <BeforeReminders reminders={reminders} />
    </ScrollView>
  );
};
