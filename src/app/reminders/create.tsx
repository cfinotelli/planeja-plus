import { Crypto } from "@/lib/crypto";
import { useRepoStore } from "@/stories/repo/repo-store";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  Modal,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { DateSelectModeTabs } from "../_components/date-select-mode-tabs";
import { FooterButton } from "../_components/footer-button";
import { GoBackButton } from "../_components/go-back-button";
import { HeadingTemplate } from "../_components/heading-template";
import { LinkButton } from "../_components/link-button";

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

            <Text className="text-base font-bold text-slate-700">
              Criar novo Lembrete
            </Text>
          </>
        }
        footerChildren={
          <LinkButton pathname="/reminders/all" title="Ver meus lembretes" />
        }
      />

      <View className="flex-1 h-full justify-between p-5 pb-7">
        <View className="space-y-3">
          <Text className="font-bold text-base">
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
            className="p-3 px-4 bg-slate-300 border-solid rounded-lg  focus:border focus:border-cyan-400"
          />

          <DateSelectModeTabs handleShowMode={handleToggleMode} />

          {currentDateSelected && (
            <Text className="bg-slate-300 p-2 rounded-md">
              {currentDateSelected}
            </Text>
          )}

          {currentHourSelected && (
            <Text className="bg-slate-300 p-2 rounded-md">
              {currentHourSelected}
            </Text>
          )}

          {pickerLabels.show && Platform.OS === "android" && (
            <DateTimePicker
              is24Hour
              locale="pt-BR"
              mode={pickerLabels.mode}
              minimumDate={new Date()}
              onChange={handleOnChangePicker}
              value={pickerLabels.date}
              style={{ alignSelf: "center" }}
            />
          )}

          {Platform.OS === "ios" && (
            <Modal transparent={true} visible={pickerLabels.show} animationType="slide">
              <View className="flex-1 justify-end bg-black/30">
                <View className="bg-white p-5 rounded-t-2xl space-y-3">
                  <DateTimePicker
                    is24Hour
                    locale="pt-BR"
                    mode={pickerLabels.mode}
                    minimumDate={new Date()}
                    onChange={handleOnChangePicker}
                    value={pickerLabels.date}
                    display="spinner"
                    style={{ alignSelf: "center" }}
                  />
                  <Button title="Confirmar" onPress={() => setPikerLabels(prev => ({ ...prev, show: false }))} />
                </View>
              </View>
            </Modal>
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
