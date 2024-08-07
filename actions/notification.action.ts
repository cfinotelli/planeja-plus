import { Notifications } from "@/lib/notifications";

export async function ReminderNotification({
  label,
  reminderAt,
}: {
  label: string;
  reminderAt: Date;
}) {
  await Notifications.requestPermissionsAsync();
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== "granted") {
    alert("Sem permissao para o envio de notificações!");
    return;
  }

  // let _token = (await Notifications.getExpoPushTokenAsync()).data;

  await Notifications.scheduleNotificationAsync({
    identifier: "Default Reminder",

    content: {
      title: "Lembrete ✔",
      body: label,
      vibrate: [0, 250, 250, 250],
    },
    trigger: {
      date: reminderAt,
    },
  });
}
