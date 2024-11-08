import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TapService } from './tap.service';
import { UsersService } from 'src/users/users.service';
export declare class TapGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly tapService;
    private readonly userService;
    constructor(tapService: TapService, userService: UsersService);
    server: Server;
    private pressCounts;
    afterInit(server: Server): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    init(id: [{
        message: string;
        idTelegram: string;
        username: string;
    }, ''], client: Socket): Promise<void>;
    salary(id: [{
        message: string;
        idTelegram: string;
        username: string;
    }, ''], client: Socket): Promise<void>;
    handleButtonPress(data: any, client: Socket): Promise<void>;
    clickTap(id: string, client: Socket): Promise<{
        coins: number;
        energy: number;
        _id?: number;
        idTelegram: string;
        username: string;
        level: number;
        salary: number;
        rating: number;
        dateRegistartion: string;
        dateSalary: string;
        dateUpdated: string;
        dateOnline: string;
        dateOnlineDaily: string;
        isDailyTaken: boolean;
        dailyCounter: number;
        socketId: string;
        referralUsersJSON: any;
        questsUsersJSON: any;
        questsDailyUsersJSON: any;
        userCards: import("../user-cards/entities/user-card.entity").UserCard[];
        teams: import("../teams/entities/team.entity").Team[];
    } & import("../users/entities/user.entity").default>;
}
