import { CreateTapDto } from './dto/create-tap.dto';
import { UpdateTapDto } from './dto/update-tap.dto';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
export declare class TapService {
    private readonly userRepository;
    private readonly userService;
    constructor(userRepository: Repository<User>, userService: UsersService);
    create(createTapDto: CreateTapDto): string;
    updateUserSocketId(idTelegram: string, socketId: string): Promise<{
        socketId: string;
        _id?: number;
        idTelegram: string;
        username: string;
        level: number;
        salary: number;
        rating: number;
        energy: number;
        coins: number;
        dateRegistartion: string;
        dateSalary: string;
        dateUpdated: string;
        dateOnline: string;
        dateOnlineDaily: string;
        isDailyTaken: boolean;
        dailyCounter: number;
        referralUsersJSON: any;
        questsUsersJSON: any;
        questsDailyUsersJSON: any;
        userCards: import("../user-cards/entities/user-card.entity").UserCard[];
        teams: import("../teams/entities/team.entity").Team[];
    } & User>;
    clickTap(idTelegram: string, socketId: string): Promise<{
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
    } & User>;
    onUpdate(idTelegram: string, socketId: string): Promise<number>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTapDto: UpdateTapDto): string;
    remove(id: number): string;
}
