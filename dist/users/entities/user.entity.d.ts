import { Team } from 'src/teams/entities/team.entity';
import { UserCard } from 'src/user-cards/entities/user-card.entity';
export type IRefUser = {
    userId: number;
};
declare class User {
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
    socketId: string;
    referralUsersJSON: any;
    questsUsersJSON: any;
    questsDailyUsersJSON: any;
    userCards: UserCard[];
    teams: Team[];
}
export default User;
