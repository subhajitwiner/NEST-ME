import { Injectable } from '@nestjs/common';
import { WebsocGateway } from 'src/websoc/websoc.gateway';

@Injectable()
export class NotificationService {
    constructor(private readonly notificationGateway: WebsocGateway) {}
    sendNotification(message: string) {
        this.notificationGateway.server.emit('notify', message);  // Broadcast to all users
    }
}
