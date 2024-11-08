import { CreateUserDto } from './create-user.dto';
import { IRefUser } from '../entities/user.entity';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    idTelegram?: string;
    username?: string;
    level?: number;
    salary?: number;
    energy?: number;
    dateRegistartion?: string;
    dateSalary?: string;
    dateUpdated?: string;
    dateOnline?: string;
    dateOnlineDaily?: string;
    dailyCounter?: number;
    rating?: number;
    socketId?: string;
    refUsers?: IRefUser[];
}
export {};
