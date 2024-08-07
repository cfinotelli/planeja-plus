import { ReminderProps } from "@/stories/repo-store.types";
import {
  Modal,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DateSelectModeTabs } from "./date-select-mode-tabs";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { FooterButton } from "./footer-button";
import { useRepoStore } from "@/stories/repo-store";
import { ConfirmationModal } from "./confirmation-modal";
import colors from "tailwindcss/colors";

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

  function handleToggleNotification() {
    setCurrentReminder({
      ...reminder,
      notificationOn: !reminder.notificationOn,
    });
  }

  function handleToggleAlert() {
    setCurrentReminder({
      ...reminder,
      alertOn: !reminder.alertOn,
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
        <View className="w-11/12 bg-white p-5 rounded-md shadow-lg">
          <Text className="text-lg mb-4">
            Alterando o lembrete:{" "}
            <Text className="font-bold">{reminder.label}</Text>
          </Text>

          <View className="space-y-3">
            <View className="items-center justify-between w-full flex-row">
              <View className="flex-row items-center h-4 justify-center">
                <Text className="text-xs font-medium">Alarme</Text>
                <Switch
                  value={currentReminder.alertOn}
                  onValueChange={handleToggleAlert}
                  trackColor={{
                    true: colors.cyan[500],
                  }}
                  thumbColor={colors.cyan[600]}
                />
              </View>
              <View className="flex-row items-center h-4 justify-center">
                <Text className="text-xs font-medium">Notificação</Text>
                <Switch
                  value={currentReminder.notificationOn}
                  onValueChange={handleToggleNotification}
                  trackColor={{
                    true: colors.cyan[500],
                  }}
                  thumbColor={colors.cyan[600]}
                />
              </View>
            </View>

            <Text>Dê um nome ao lembrete:</Text>
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
              className="p-1 px-4 border border-slate-400 border-solid rounded-lg mb-3"
            />

            <DateSelectModeTabs handleShowMode={handleToggleMode} />

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
          </View>

          <View className="flex-row justify-end space-x-1 mt-4">
            <View className="w-1/3">
              <TouchableOpacity
                onPress={onClose}
                className="p-2 rounded-md items-center justify-center"
              >
                <Text className="text-slate-800">Cancelar</Text>
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
