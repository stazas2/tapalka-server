import { Repository } from 'typeorm';
import { UserCard } from './entities/user-card.entity';
import User from 'src/users/entities/user.entity';
import { Card } from 'src/cards/entities/card.entity';
import { UsersService } from 'src/users/users.service';
export declare class UserCardsService {
    private readonly userService;
    private readonly userCardRepository;
    private readonly userRepository;
    private readonly cardRepository;
    constructor(userService: UsersService, userCardRepository: Repository<UserCard>, userRepository: Repository<User>, cardRepository: Repository<Card>);
    getUserCards(_id: number): Promise<UserCard[]>;
    getUserCardsByCategory(_id: number, category: string): Promise<{
        salary: number;
        level: number;
        upgradeCost: number;
        _id: number;
        user: User;
        card: Card;
    }[]>;
    assignCardToUser(cardId: number, userId: number): Promise<{
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
    upgradeUserCard(userId: number, userCardId: number): Promise<User | {
        user: User;
        userCard: UserCard;
    }>;
}
