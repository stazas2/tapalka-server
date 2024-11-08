import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class CronService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    private readonly logger;
    handleCron(): Promise<void>;
    handleCronCalculateUsersRating(): Promise<void>;
    handleCronUpdateIsDailyTaken(): Promise<void>;
}
