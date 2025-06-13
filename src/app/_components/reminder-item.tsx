import { reminderNotification } from "@/actions/notification.action";
import { NotificationModule } from "@/actions/notification/notification-module";
import { ClockIcon } from "@/assets/icons";
import { cn } from "@/lib/cn";
import { ReminderProps } from "@/stories/repo/repo-store.types";
import { FontAwesome } from "@expo/vector-icons";
import { formatRelative, isBefore } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useCallback, useEffect, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { UpdateReminderItem } from "./update-reminder-item";

interface ReminderItemProps {
  reminder: ReminderProps;
}

export const ReminderItem = ({ reminder }: ReminderItemProps) => {
  const notificationModule = new NotificationModule();

  const [modalUpdateReminderVisible, setModalUpdateReminderVisible] =
    useState(false);

  const handleNotification = useCallback(async () => {
    await reminderNotification(
      {
        label: reminder.label,
        reminderAt: new Date(reminder.reminderAt),
      },
      notificationModule
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reminder.label, reminder.reminderAt]);

  useEffect(() => {
    handleNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reminder.reminderAt]);

  const memoBeforeReminder = isBefore(reminder.reminderAt, new Date());

  return (
    <Animated.View
      className="bg-slate-300 flex-row flex-1 items-center rounded-md p-2 px-4"
    >
      <View className="flex-1 flex-row items-center justify-between">
        <View className="flex-col flex-1 items-center justify-start space-y-2">
          {reminder.label && (
            <Text
              className={cn(
                memoBeforeReminder
                  ? `${"text-slate-700"
                  }`
                  : `${"text-slate-900"
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
                  ? `${"text-slate-700"}` : `${"text-slate-900"}`, "text-sm ml-1"
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
