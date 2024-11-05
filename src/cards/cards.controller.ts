import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get('category/:category')
  findAllByCategory(@Param('category') category: string) {
    console.log('category cards: ', category)
    return this.cardsService.findAllByCategory(category);
  }


  @Get('category/:category/:id')
  findAllByCategoryAndId(@Param('category') category: string, @Param('id') id: number) {
    console.log('category cards: ', category)
    return this.cardsService.findAllByCategoryAndId(category, id);
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cardsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }
}
