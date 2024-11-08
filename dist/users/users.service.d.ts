import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { UserCard } from 'src/user-cards/entities/user-card.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private userRepository;
    private userCardsRepository;
    constructor(userRepository: Repository<User>, userCardsRepository: Repository<UserCard>);
    create(createUserDto: CreateUserDto, idTelegramRef?: string): Promise<User>;
    updateOnline(idTelegram: string): Promise<number>;
    tap(_id: number): Promise<User>;
    recalculateSalary(_id: number): Promise<{
        salary: number;
        _id?: number;
        idTelegram: string;
        username: string;
        level: number;
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
        socketId: string;
        referralUsersJSON: any;
        questsUsersJSON: any;
        questsDailyUsersJSON: any;
        userCards: UserCard[];
        teams: import("../teams/entities/team.entity").Team[];
    } & User>;
    findAll(): Promise<User[]>;
    findOne(idTelegram: string): Promise<User>;
    findOneByTelegramId(idTelegram: string): Promise<User>;
    update(_id: number, updateUserDto: UpdateUserDto): Promise<User>;
    getMyRefUsers(idTelegram: string): Promise<User>;
    onClickQuest(idTelegram: string, idQuest: number): Promise<User>;
    onClickDailyQuest(idTelegram: string): Promise<User>;
    getIsDailyTaken(idTelegram: string): Promise<{
        isDailyTaken: boolean;
        counter: number;
    }>;
}
