import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, idRefTelegram: string): Promise<import("./entities/user.entity").default>;
    tap(id: number): Promise<import("./entities/user.entity").default>;
    updateUsers(idTelegram: string): Promise<import("./entities/user.entity").default>;
    findAll(): Promise<import("./entities/user.entity").default[]>;
    findOne(id: string): Promise<import("./entities/user.entity").default>;
    findOneByTelegramId(idTelegram: string): Promise<import("./entities/user.entity").default>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").default>;
    onClickQuest(id: string, idQuest: number): Promise<import("./entities/user.entity").default>;
    onClickDailyQuest(id: string): Promise<import("./entities/user.entity").default>;
    onGetDailyCounter(id: string): Promise<{
        isDailyTaken: boolean;
        counter: number;
    }>;
}
