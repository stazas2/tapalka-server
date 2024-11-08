import { UserCard } from "src/user-cards/entities/user-card.entity";
export declare class Card {
    _id: number;
    title: string;
    descriptionShort: string;
    description: string;
    level: number;
    salary: number;
    rph: number;
    progress: number;
    urlPicture: string;
    urlPictureSocial: string;
    urlUser: string;
    urlUserTitle: string;
    price: number;
    dateCreation: string;
    upgradeCost: number;
    category: string;
    userCards: UserCard[];
}
