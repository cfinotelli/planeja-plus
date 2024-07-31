import { useNavigation } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { GoBackButton } from "../_components/go-back-button";
import HeadingTemplate from "../_components/heading-template";
import { LinkButton } from "../_components/link-button";
import { useRepoStore } from "@/stories/repo-store";
import { Crypto } from "@/lib/crypto";

interface ReminderItemProps {
  label: string;
  reminderAt: Date;
}

export default function Page() {
  const navigation = useNavigation();
  const { createReminder } = useRepoStore((state) => state);
  const [reminderLabel, setReminderLabel] = useState<ReminderItemProps>(
    {} as ReminderItemProps
  );

  const handleGoBack = () => navigation.goBack();

  function handleCreateReminder() {
    if (!reminderLabel) {
      return;
    }

    if (reminderLabel) {
      createReminder({
        id: Crypto.randomUUID(),
        label: reminderLabel.label,
        reminderAt: new Date(),
        alertOn: true,
        notificationOn: true,
      });

      return handleGoBack();
    }
  }

  return (
    <View className="flex-1 w-full">
      <HeadingTemplate
        headerChildren={
          <>
            <GoBackButton />

            <Text className="text-base font-bold text-slate-50">
              Criar novo Lembrete
            </Text>
          </>
        }
        footerChildren={
          <LinkButton pathname="lists/all" title="Ver minhas listas" />
        }
      />

      <View className="flex-1 h-full justify-between p-5">
        <View className="space-y-3">
          <Text>Dê um nome ao lembrete:</Text>
          <TextInput
            placeholder="Beber água"
            onChange={(e) => {
              const { text } = e.nativeEvent;
              setReminderLabel((prevState) => {
                return {
                  ...prevState,
                  label: text,
                };
              });
            }}
            value={reminderLabel?.label}
            className="p-1 px-4 border border-slate-400 border-solid rounded-lg"
          />
        </View>

        <TouchableOpacity
          onPress={handleCreateReminder}
          activeOpacity={0.7}
          className="w-full p-1.5 rounded-md  bg-slate-700"
        >
          <Text className="text-center text-slate-100 font-semibold text-sm">
            Criar lembrete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
