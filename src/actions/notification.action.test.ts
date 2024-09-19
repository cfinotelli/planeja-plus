import { PermissionStatus } from 'expo-notifications';
import { reminderNotification } from './notification.action';
import { NotificationModule } from './notification/notification-module';

jest.mock('./notification/notification-module');

describe('reminderNotification', () => {
  let mockNotificationModule: jest.Mocked<NotificationModule>;
  let mockAlert: jest.Mock;

  beforeEach(() => {
    mockNotificationModule = {
      requestPermissionsAsync: jest.fn(),
      getPermissionsAsync: jest.fn(),
      scheduleNotificationAsync: jest.fn(),
    }

    mockAlert = jest.fn();
    global.alert = mockAlert;
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete (global as any).alert;
  });

  const label = 'Tomar um café';
  const reminderAt = new Date('2025-05-01T05:00:00');

  it('should schedule a notification when permission is granted', async () => {
    mockNotificationModule.getPermissionsAsync.mockResolvedValue({
      status: 'granted' as PermissionStatus,
      expires: 'never',
      granted: true,
      canAskAgain: true
    });

    await reminderNotification({ label, reminderAt }, mockNotificationModule);

    expect(mockNotificationModule.requestPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(mockNotificationModule.getPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(mockNotificationModule.scheduleNotificationAsync).toHaveBeenCalledWith({ label, reminderAt });
    expect(mockAlert).not.toHaveBeenCalled();
  });

  it('should request permission again if initially not granted', async () => {
    mockNotificationModule.getPermissionsAsync.mockResolvedValue({
      status: 'denied' as PermissionStatus,
      expires: 'never',
      granted: false,
      canAskAgain: true
    });

    mockNotificationModule.requestPermissionsAsync
      .mockResolvedValueOnce({
        status: 'denied' as PermissionStatus,
        expires: 'never',
        granted: false,
        canAskAgain: true
      })
      .mockResolvedValueOnce({
        status: 'granted' as PermissionStatus,
        expires: 'never',
        granted: true,
        canAskAgain: true
      });

    await reminderNotification({ label, reminderAt }, mockNotificationModule);

    expect(mockNotificationModule.requestPermissionsAsync).toHaveBeenCalledTimes(2);
    expect(mockNotificationModule.getPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(mockNotificationModule.scheduleNotificationAsync).toHaveBeenCalledWith({ label, reminderAt });
    expect(mockAlert).not.toHaveBeenCalled();
  });

  it('should display an alert if permission is denied', async () => {
    mockNotificationModule.getPermissionsAsync.mockResolvedValue({
      status: 'denied' as PermissionStatus,
      expires: 'never',
      granted: false,
      canAskAgain: true
    });
    mockNotificationModule.requestPermissionsAsync.mockResolvedValue({
      status: 'denied' as PermissionStatus,
      expires: 'never',
      granted: false,
      canAskAgain: true
    });

    await reminderNotification({ label, reminderAt }, mockNotificationModule);

    expect(mockNotificationModule.requestPermissionsAsync).toHaveBeenCalledTimes(2);
    expect(mockNotificationModule.getPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(mockNotificationModule.scheduleNotificationAsync).not.toHaveBeenCalled();
    expect(mockAlert).toHaveBeenCalledWith('Falha ao receber permissão para o envio de notificações!');
  });
});