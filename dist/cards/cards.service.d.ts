import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';
import { UserCardsService } from 'src/user-cards/user-cards.service';
export declare class CardsService {
    private readonly cardRepository;
    private readonly userCardService;
    constructor(cardRepository: Repository<Card>, userCardService: UserCardsService);
    create(createCardDto: CreateCardDto): Promise<Card>;
    findAll(): Promise<Card[]>;
    findAllByCategory(category: string): Promise<Card[]>;
    findAllByCategoryAndId(category: string, id: number): Promise<Card[]>;
    update(_id: number, updateUserDto: UpdateCardDto): Promise<Card>;
    remove(id: number): string;
}
