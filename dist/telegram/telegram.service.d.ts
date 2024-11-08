import { UsersService } from 'src/users/users.service';
export declare class TelegramService {
    private readonly userService;
    private bot;
    constructor(userService: UsersService);
    sendStartMessage(chatId: string, msg?: string): void;
}
