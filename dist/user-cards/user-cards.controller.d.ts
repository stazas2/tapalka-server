import { UserCardsService } from './user-cards.service';
import { AssignCardDto } from './dto/assign-card.dto';
export declare class UserCardsController {
    private readonly userCardsService;
    constructor(userCardsService: UserCardsService);
    assignCardToUser(assignCardDto: AssignCardDto): Promise<{
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
        userCards: import("./entities/user-card.entity").UserCard[];
        teams: import("../teams/entities/team.entity").Team[];
    } & import("../users/entities/user.entity").default>;
    upgradeUserCard(userId: number, userCardId: number): Promise<import("../users/entities/user.entity").default | {
        user: import("../users/entities/user.entity").default;
        userCard: import("./entities/user-card.entity").UserCard;
    }>;
    getUserCards(id: number): Promise<import("./entities/user-card.entity").UserCard[]>;
    getUserCardsByCategory(id: number, category: string): Promise<{
        salary: number;
        level: number;
        upgradeCost: number;
        _id: number;
        user: import("../users/entities/user.entity").default;
        card: import("../cards/entities/card.entity").Card;
    }[]>;
}
