import { Notifications } from "@/lib/notifications";

export async function ReminderNotification({
  label,
  reminderAt,
}: {
  label: string;
  reminderAt: Date;
}) {
  await Notifications.requestPermissionsAsync();
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Falha ao receber permissão para o envio de notificações!");
    return;
  }

  await Notifications.scheduleNotificationAsync({
    identifier: "Default Reminder",

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
