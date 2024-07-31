import { useRepoStore } from "@/stories/repo-store";
import { ReminderProps } from "@/stories/repo-store.types";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Animated, Text, TouchableOpacity, View, Switch } from "react-native";
import colors from "tailwindcss/colors";
import { ConfirmationModal } from "./confirmation-modal";
import { useState } from "react";

interface ReminderItemProps {
  reminder: ReminderProps;
  drag?: () => void;
  isActive?: boolean;
}

interface ReminderStateProps {
  notificationOn: boolean;
  alertOn: boolean;
  reminderAt: Date;
}

export const ReminderItem = ({ drag, reminder }: ReminderItemProps) => {
  const { updateReminder, removeReminder } = useRepoStore((state) => state);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleToggleNotification = () => {
    updateReminder({
      ...reminder,
      notificationOn: !reminder.notificationOn,
    });
  };

  const handleToggleAlert = () => {
    updateReminder({
      ...reminder,
      alertOn: !reminder.alertOn,
    });
  };

  const handleUpdateReminderAt = () => {
    updateReminder({
      ...reminder,
      // reminderAt: currentReminder.reminderAt,
    });
  };

  const handleDeleteReminder = () => {
    removeReminder(reminder.id);
    setModalVisible(false);
  };

  return (
    <Animated.View className="flex-row flex-1 items-center border border-slate-500 rounded-md p-2">
      {drag && (
        <TouchableOpacity
          onLongPress={drag}
          activeOpacity={0.7}
          className="mr-2 border-r  h-full border-slate-400 items-center justify-center"
        >
          <MaterialIcons
            name="drag-indicator"
            size={22}
            color={colors.slate[400]}
          />
        </TouchableOpacity>
      )}

      <View className="flex-1">
        <View className="flex-row flex-1 items-center justify-between">
          <Text className="text-base">{reminder.label}</Text>
          <View className="flex-row items-center">
            <Text className="font-bold text-base mr-1">
              {formatRelative(reminder.reminderAt, new Date(), {
                locale: ptBR,
              })}
            </Text>
            <SimpleLineIcons name="bell" size={14} color={colors.cyan[600]} />
          </View>
        </View>

        <View className="flex-row flex-1 items-center justify-between">
          <View className="flex-row flex-1 items-center justify-start gap-4">
            <View className="items-center justify-center">
              <Switch
                value={reminder.alertOn}
                onValueChange={handleToggleAlert}
                trackColor={{
                  true: colors.cyan[500],
                }}
                thumbColor={colors.cyan[600]}
              />
              <Text className="text-xs font-medium italic">Alarme</Text>
            </View>
            <View className="items-center justify-center">
              <Switch
                value={reminder.notificationOn}
                onValueChange={handleToggleNotification}
                trackColor={{
                  true: colors.cyan[500],
                }}
                thumbColor={colors.cyan[600]}
              />
              <Text className="text-xs font-medium italic">Notificação</Text>
            </View>
          </View>
        </View>
      </View>

      <ConfirmationModal
        visible={isModalVisible}
        onCancel={() => setModalVisible(false)}
        onAccept={handleDeleteReminder}
      />
    </Animated.View>
  );
};
