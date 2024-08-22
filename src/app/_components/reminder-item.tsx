import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { formatRelative, isBefore } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { useEffect, useState } from "react";
import { ClockIcon } from "@/assets/icons";
import { UpdateReminderItem } from "./update-reminder-item";
import { cn } from "@/lib/cn";
import { ReminderNotification } from "@/actions/notification.action";
import { useColorScheme } from "nativewind";
import { ReminderProps } from "@/stories/repo/repo-store.types";

interface ReminderItemProps {
  reminder: ReminderProps;
}

export const ReminderItem = ({ reminder }: ReminderItemProps) => {
  const { colorScheme } = useColorScheme();
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

  const memoBeforeReminder = isBefore(reminder.reminderAt, new Date());

  return (
    <Animated.View
      className={cn(
        colorScheme === "light" && "bg-slate-300",
        "flex-row flex-1 items-center dark:bg-slate-700 rounded-md p-2 px-4"
      )}
    >
      <View className="flex-1 flex-row items-center justify-between">
        <View className="flex-col flex-1 items-center justify-start space-y-2">
          {reminder.label && (
            <Text
              className={cn(
                memoBeforeReminder
                  ? `${
                      colorScheme === "light"
                        ? "text-slate-700"
                        : "dark:text-slate-300"
                    }`
                  : `${
                      colorScheme === "light"
                        ? "text-slate-900"
                        : "dark:text-slate-300"
                    }`,
                "font-bold text-base text-left w-full"
              )}
            >
              {reminder.label}
            </Text>
          )}
          <View className="flex-row items-center text-left w-full">
            <ClockIcon size={14} />
            <Text
              className={cn(
                memoBeforeReminder
                  ? `${
                      colorScheme === "light"
                        ? "text-slate-700"
                        : "dark:text-slate-300"
                    }`
                  : `${
                      colorScheme === "light"
                        ? "text-slate-900"
                        : "dark:text-slate-300"
                    }`,
                "text-sm ml-1"
              )}
            >
              {formatRelative(reminder.reminderAt, new Date(), {
                locale: ptBR,
              })}
            </Text>
          </View>
        </View>

        {!memoBeforeReminder && (
          <TouchableOpacity onPress={() => setModalUpdateReminderVisible(true)}>
            <FontAwesome
              name="pencil-square-o"
              size={20}
              color={colors.cyan[600]}
            />
          </TouchableOpacity>
        )}
      </View>

      {!memoBeforeReminder && (
        <UpdateReminderItem
          visible={modalUpdateReminderVisible}
          onClose={() => setModalUpdateReminderVisible(false)}
          reminder={reminder}
        />
      )}
    </Animated.View>
  );
};
