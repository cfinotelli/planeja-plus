import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { DateSelectModeTabs } from "./date-select-mode-tabs";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { FooterButton } from "./footer-button";
import { ConfirmationModal } from "./confirmation-modal";
import { useRepoStore } from "@/stories/repo/repo-store";
import { ReminderProps } from "@/stories/repo/repo-store.types";
import { useColorScheme } from "nativewind";
import { cn } from "@/lib/cn";

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
  const { colorScheme } = useColorScheme();
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
          className={cn(
            colorScheme === "light" && "bg-slate-100",
            "w-11/12 dark:bg-slate-600 p-5 rounded-md shadow-lg"
          )}
        >
          <Text className="text-lg mb-4 dark:text-slate-50">
            Alterando o lembrete:{" "}
            <Text className="font-bold">{reminder.label}</Text>
          </Text>

          <View className="space-y-3">
            <Text className="dark:text-slate-50 font-semibold">
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
              className={cn(
                colorScheme === "light" && "bg-slate-300",
                "p-3 px-4 dark:bg-slate-700 border-solid rounded-lg dark:text-slate-50 focus:border focus:border-cyan-400"
              )}
            />

            <DateSelectModeTabs handleShowMode={handleToggleMode} />

            {currentDateSelected && (
              <Text
                className={cn(
                  colorScheme === "light" && "bg-slate-300",
                  "dark:bg-slate-700 p-2 rounded-md dark:text-slate-200"
                )}
              >
                {currentDateSelected}
              </Text>
            )}

            {currentHourSelected && (
              <Text
                className={cn(
                  colorScheme === "light" && "bg-slate-300",
                  "dark:bg-slate-700 p-2 rounded-md dark:text-slate-200"
                )}
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
                <Text className="dark:text-slate-200">Cancelar</Text>
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
        <DateTimePicker
          is24Hour
          locale="pt-BR"
          mode={pickerLabels.mode}
          minimumDate={new Date()}
          onChange={handleOnChangePicker}
          value={new Date(currentReminder.reminderAt)}
        />
      )}

      <ConfirmationModal
        visible={modalDeleteReminderVisible}
        onCancel={() => setModalDeleteReminderVisible(false)}
        onAccept={handleDeleteReminder}
      />
    </Modal>
  );
};
