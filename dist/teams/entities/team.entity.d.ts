import User from "src/users/entities/user.entity";
export declare class Team {
    id: number;
    title: string;
    description: string;
    level: number;
    salary: number;
    rph: number;
    progress: number;
    urlPicture: string;
    cards: User[];
}
