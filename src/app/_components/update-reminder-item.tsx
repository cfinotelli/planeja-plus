import { useRepoStore } from "@/stories/repo/repo-store";
import { ReminderProps } from "@/stories/repo/repo-store.types";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import React, { useState } from "react";
import { Button, Modal, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ConfirmationModal } from "./confirmation-modal";
import { DateSelectModeTabs } from "./date-select-mode-tabs";
import { FooterButton } from "./footer-button";

type UpdateReminderProps = ReminderProps;

interface UpdateReminderItemProps {
  visible: boolean;
  onClose: () => void;
  reminder: ReminderProps;
}

export const UpdateReminderItem = ({
  visible,
  onClose,
  reminder,
}: UpdateReminderItemProps) => {
  const { updateReminder, removeReminder } = useRepoStore((state) => state);
  const [currentReminder, setCurrentReminder] = useState<UpdateReminderProps>(
    () => {
      if (reminder.id) {
        return reminder;
      }

      return {} as UpdateReminderProps;
    }
  );
  const [pickerLabels, setPikerLabels] = useState<{
    date: Date;
    show: boolean;
    mode: "date" | "time";
  }>({
    date: new Date(reminder.reminderAt),
    show: false,
    mode: "date",
  });
  const [modalDeleteReminderVisible, setModalDeleteReminderVisible] =
    useState(false);

  function handleToggleMode(mode: "date" | "time") {
    setPikerLabels((prev) => {
      return {
        ...prev,
        mode,
        show: true,
      };
    });
  }

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

    setCurrentReminder((prev) => {
      return {
        ...prev,
        reminderAt: selectedDate.toISOString(),
      };
    });
  }

  const handleDeleteReminder = () => {
    removeReminder(reminder.id);
    setModalDeleteReminderVisible(false);
  };

  function handleUpdateReminder() {
    updateReminder(currentReminder);
    onClose();
  }

  const currentDateSelected =
    currentReminder.reminderAt &&
    format(currentReminder.reminderAt, "'Dia:' dd'/'MM");

  const currentHourSelected =
    currentReminder.reminderAt &&
    format(currentReminder.reminderAt, "'Horário:' HH:mm");

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-slate-900/80 bg-opacity-50">
        <View
          className="w-11/12 p-5 rounded-md shadow-lg bg-slate-100"
        >
          <Text className="text-lg mb-4">
            Alterando o lembrete:{" "}
            <Text className="font-bold">{reminder.label}</Text>
          </Text>

          <View className="space-y-3">
            <Text className="font-semibold">
              Nome do lembrete:
            </Text>
            <TextInput
              placeholder="Meu lembrete"
              onChange={(e) => {
                const { text } = e.nativeEvent;
                setCurrentReminder((prevState) => {
                  return {
                    ...prevState,
                    label: text,
                  };
                });
              }}
              value={currentReminder?.label}
              className="bg-slate-300 p-3 px-4 border-solid rounded-lg focus:border focus:border-cyan-400"
            />

            <DateSelectModeTabs handleShowMode={handleToggleMode} />

            {currentDateSelected && (
              <Text
                className="bg-slate-300 p-2 rounded-md"
              >
                {currentDateSelected}
              </Text>
            )}

            {currentHourSelected && (
              <Text
                className="bg-slate-300 p-2 rounded-md"
              >
                {currentHourSelected}
              </Text>
            )}
          </View>

          <View className="flex-row justify-end space-x-1 mt-4">
            <View className="w-1/3">
              <TouchableOpacity
                onPress={onClose}
                className="p-2 rounded-md items-center justify-center"
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>

            <View className="w-1/3">
              <TouchableOpacity
                onPress={() => setModalDeleteReminderVisible(true)}
                className="p-2 rounded-md bg-red-400 items-center justify-center"
              >
                <Text className="text-red-800 font-bold">Deletar</Text>
              </TouchableOpacity>
            </View>
            <View className="w-1/3">
              <FooterButton
                available
                onPress={handleUpdateReminder}
                title="Alterar"
              />
            </View>
          </View>
        </View>
      </View>

      {pickerLabels.show && (
        <>
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
        </>
      )}

      <ConfirmationModal
        visible={modalDeleteReminderVisible}
        onCancel={() => setModalDeleteReminderVisible(false)}
        onAccept={handleDeleteReminder}
      />
    </Modal>
  );
};
