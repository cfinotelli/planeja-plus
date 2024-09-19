import { Notifications } from "@/lib/notifications";

export class NotificationModule {
  async requestPermissionsAsync() {
    return await Notifications.requestPermissionsAsync();
  }

  async getPermissionsAsync() {
    return await Notifications.getPermissionsAsync();
  }

  async scheduleNotificationAsync({
    label,
    reminderAt,
  }: {
    label: string;
    reminderAt: Date;
  }) {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: "Planeja Plus - Lembrete ✔",
        body: label,
        vibrate: [0, 250, 250, 250],
      },
      trigger: {
        date: reminderAt,
      },
    });
  }
}
