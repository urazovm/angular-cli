import { PushNotification, Permission } from './push-notification.type';
export declare class PushNotificationsService {
    permission: Permission;
    requestPermission(): void;
    create(title: string, options?: PushNotification): any;
}
