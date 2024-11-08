import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
export declare class QuestsService {
    create(createQuestDto: CreateQuestDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateQuestDto: UpdateQuestDto): string;
    remove(id: number): string;
}
