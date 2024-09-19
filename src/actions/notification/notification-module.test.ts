import { Notifications } from "@/lib/notifications";
import { NotificationModule } from './notification-module';

jest.mock("@/lib/notifications");

describe('NotificationModule', () => {
  let notificationModule: NotificationModule;

  beforeEach(() => {
    notificationModule = new NotificationModule();
    jest.clearAllMocks();
  });

  const label = 'Teste de notificação';
  const reminderAt = new Date('2023-05-01T10:00:00');

  it('should call Notifications.requestPermissionsAsync', async () => {
    await notificationModule.requestPermissionsAsync();
    expect(Notifications.requestPermissionsAsync).toHaveBeenCalled();
  });

  it('should call Notifications.getPermissionsAsync', async () => {
    await notificationModule.getPermissionsAsync();
    expect(Notifications.getPermissionsAsync).toHaveBeenCalled();
  });

  it('should call Notifications.scheduleNotificationAsync with the correct parameters', async () => {
    await notificationModule.scheduleNotificationAsync({ label, reminderAt });

    expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith({
      content: {
        title: "Planeja Plus - Lembrete ✔",
        body: label,
        vibrate: [0, 250, 250, 250],
      },
      trigger: {
        date: reminderAt,
      },
    });
  });
});