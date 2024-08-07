import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GoBackButton } from "../_components/go-back-button";
import HeadingTemplate from "../_components/heading-template";
import { LinkButton } from "../_components/link-button";
import { useRepoStore } from "@/stories/repo-store";
import { Crypto } from "@/lib/crypto";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { CalendarIcon, ClockIcon } from "@/assets/icons";
import { FooterButton } from "../_components/footer-button";

interface ReminderItemProps {
  label: string;
  reminderAt: string;
}

export default function Page() {
  const navigation = useNavigation();
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

  function handleShowMode(mode: "date" | "time") {
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
      alertOn: true,
      notificationOn: true,
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

          <View className="flex-row gap-1">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleShowMode("date")}
              className="flex-1 justify-center items-center border border-slate-400 rounded-md p-1"
            >
              <View className="flex-row items-center justify-center">
                <CalendarIcon size={18} />
                <Text className="font-bold text-slate-800 ml-1">
                  Selecionar data
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleShowMode("time")}
              className="flex-1 justify-center items-center border border-slate-400 rounded-md p-1"
            >
              <View className="flex-row items-center justify-center">
                <ClockIcon size={18} />

                <Text className="font-bold text-slate-800 ml-1">
                  Selecionar horário
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {currentDateSelected && (
            <Text className="border border-slate-400 p-2 rounded-md bg-slate-300">
              {currentDateSelected}
            </Text>
          )}

          {currentHourSelected && (
            <Text className="border border-slate-400 p-2 rounded-md bg-slate-300">
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
