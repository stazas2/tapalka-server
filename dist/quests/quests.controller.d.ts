import { QuestsService } from './quests.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
export declare class QuestsController {
    private readonly questsService;
    constructor(questsService: QuestsService);
    create(createQuestDto: CreateQuestDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateQuestDto: UpdateQuestDto): string;
    remove(id: string): string;
}
