import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { GoBackButton } from "../_components/go-back-button";
import { HeadingTemplate } from "../_components/heading-template";
import { LinkButton } from "../_components/link-button";
import { Crypto } from "@/lib/crypto";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { FooterButton } from "../_components/footer-button";
import { DateSelectModeTabs } from "../_components/date-select-mode-tabs";
import { useRepoStore } from "@/stories/repo/repo-store";
import { useColorScheme } from "nativewind";
import { cn } from "@/lib/cn";

interface ReminderItemProps {
  label: string;
  reminderAt: string;
}

export default function Page() {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  const { createReminder } = useRepoStore((state) => state);
  const [reminderLabel, setReminderLabel] = useState<ReminderItemProps>(
    {} as ReminderItemProps
  );
  const [pickerLabels, setPikerLabels] = useState<{
    date: Date;
    show: boolean;
    mode: "date" | "time";
  }>({
    date: new Date(),
    show: false,
    mode: "date",
  });

  function handleOnChangePicker(
    _event: DateTimePickerEvent,
    selectedDate?: Date
  ) {
    if (!selectedDate) return;

    setPikerLabels((prev) => {
      return {
        ...prev,
        date: selectedDate,
        show: false,
      };
    });

    setReminderLabel((prev) => {
      return {
        ...prev,
        reminderAt: selectedDate.toISOString(),
      };
    });
  }

  function handleToggleMode(mode: "date" | "time") {
    setPikerLabels((prev) => {
      return {
        ...prev,
        mode,
        show: true,
      };
    });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  const dontHaveReminder = !reminderLabel.label || !reminderLabel.reminderAt;

  function handleCreateReminder() {
    if (dontHaveReminder) {
      return alert("Preencha os campos para criar seu lembrete!");
    }

    createReminder({
      id: Crypto.randomUUID(),
      label: reminderLabel.label,
      reminderAt: reminderLabel.reminderAt,
    });

    return handleGoBack();
  }

  const currentDateSelected =
    reminderLabel.reminderAt &&
    format(reminderLabel.reminderAt, "'Dia:' dd'/'MM");

  const currentHourSelected =
    reminderLabel.reminderAt &&
    format(reminderLabel.reminderAt, "'Horário:' HH:mm");

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
          <LinkButton pathname="/reminders/all" title="Ver meus lembretes" />
        }
      />

      <View className="flex-1 h-full justify-between p-5">
        <View className="space-y-3">
          <Text className="dark:text-slate-50 font-bold text-base">
            Dê um nome ao lembrete:
          </Text>

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
            className={cn(
              colorScheme === "light" && "bg-slate-300",
              "p-3 px-4 dark:bg-slate-700 border-solid rounded-lg dark:text-slate-200  focus:border focus:border-cyan-400"
            )}
          />

          <DateSelectModeTabs handleShowMode={handleToggleMode} />

          {currentDateSelected && (
            <Text
              className={cn(
                colorScheme === "light" && "bg-slate-300",
                "dark:bg-slate-600 p-2 rounded-md dark:text-slate-200"
              )}
            >
              {currentDateSelected}
            </Text>
          )}

          {currentHourSelected && (
            <Text
              className={cn(
                colorScheme === "light" && "bg-slate-300",
                "dark:bg-slate-600 p-2 rounded-md dark:text-slate-200"
              )}
            >
              {currentHourSelected}
            </Text>
          )}

          {pickerLabels.show && (
            <DateTimePicker
              is24Hour
              locale="pt-BR"
              mode={pickerLabels.mode}
              minimumDate={new Date()}
              onChange={handleOnChangePicker}
              value={pickerLabels.date}
            />
          )}
        </View>

        <FooterButton
          available={!dontHaveReminder}
          title="Criar lembrete"
          onPress={handleCreateReminder}
        />
      </View>
    </View>
  );
}
