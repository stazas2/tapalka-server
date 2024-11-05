import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('update/:idRefTelegram?')
  create(@Body() createUserDto: CreateUserDto, @Param('idRefTelegram') idRefTelegram: string,) {

    console.log('BODY + PARAM: ', createUserDto, idRefTelegram)

    return idRefTelegram ? this.usersService.create(createUserDto, idRefTelegram) : this.usersService.create(createUserDto)

  }



  @Post('tap/:id')
  tap(@Param('id') id: number) {
    return this.usersService.tap(id);
  }

  @Get('getMyRefUsers/:idTelegram')
  updateUsers(@Param('idTelegram') idTelegram: string) {
    return this.usersService.getMyRefUsers(idTelegram);
  }

  // @Post('update/:idTelegram')
  // updateOnline(@Param('idTelegram') idTelegram: string) {
  //   return this.usersService.createOrUpdate(idTelegram);
  // }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


  @Get('telegram/:id')
  findOneByTelegramId(@Param('id') idTelegram: string) {
    return this.usersService.findOneByTelegramId(idTelegram);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }


  @Post('quest/:id/:idQuest')
  onClickQuest(@Param('id') id: string, @Param('idQuest') idQuest: number) {
    return this.usersService.onClickQuest(id, idQuest);
  }

  @Post('dailyQuest/:id')
  onClickDailyQuest(@Param('id') id: string) {
    return this.usersService.onClickDailyQuest(id);
  }

  @Get('isDailyTaken/:id')
  onGetDailyCounter(@Param('id') id: string) {
    return this.usersService.getIsDailyTaken(id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
