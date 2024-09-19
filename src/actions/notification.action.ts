import { NotificationModule } from "./notification/notification-module";

export async function reminderNotification(
  {
    label,
    reminderAt,
  }: {
    label: string;
    reminderAt: Date;
  },
  notificationModule: NotificationModule
) {
  await notificationModule.requestPermissionsAsync();

  const { status: hasStatus } = await notificationModule.getPermissionsAsync();

  let finalStatus = hasStatus;

  if (hasStatus !== "granted") {
    const { status } = await notificationModule.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Falha ao receber permissão para o envio de notificações!");
    return;
  }

  await notificationModule.scheduleNotificationAsync({ label, reminderAt });
}
