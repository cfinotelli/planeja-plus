import { useRepoStore } from "@/stories/repo-store";
import { ReminderProps } from "@/stories/repo-store.types";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { ConfirmationModal } from "./confirmation-modal";
import { useEffect, useState } from "react";
import { ReminderNotification } from "@/actions/notification.action";
import { ClockIcon } from "@/assets/icons";
import { UpdateReminderItem } from "./update-reminder-item";

interface ReminderItemProps {
  reminder: ReminderProps;
  drag?: () => void;
  isActive?: boolean;
}

export const ReminderItem = ({ drag, reminder }: ReminderItemProps) => {
  const [modalUpdateReminderVisible, setModalUpdateReminderVisible] =
    useState(false);

  const handleNotiification = async () => {
    await ReminderNotification({
      label: reminder.label,
      reminderAt: new Date(reminder.reminderAt),
    });
  };

  useEffect(() => {
    handleNotiification();
  }, [reminder.reminderAt]);

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

      <View className="flex-1 flex-row items-center justify-between">
        <View className="flex-col flex-1 items-center justify-start">
          {reminder.label && (
            <Text className="font-bold text-base text-left w-full">
              {reminder.label}
            </Text>
          )}
          <View className="flex-row items-center text-left w-full">
            <ClockIcon size={14} />
            <Text className="text-sm ml-1">
              {formatRelative(reminder.reminderAt, new Date(), {
                locale: ptBR,
              })}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => setModalUpdateReminderVisible(true)}>
          <FontAwesome
            name="pencil-square-o"
            size={20}
            color={colors.cyan[600]}
          />
        </TouchableOpacity>
      </View>

      <UpdateReminderItem
        visible={modalUpdateReminderVisible}
        onClose={() => setModalUpdateReminderVisible(false)}
        reminder={reminder}
      />
    </Animated.View>
  );
};
