import { Card } from 'src/cards/entities/card.entity';
import User from 'src/users/entities/user.entity';
export declare class UserCard {
    _id: number;
    user: User;
    card: Card;
    level: number;
    salary: number;
    upgradeCost: number;
}
