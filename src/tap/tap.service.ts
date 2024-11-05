import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTapDto } from './dto/create-tap.dto';
import { UpdateTapDto } from './dto/update-tap.dto';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TapService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UsersService,
  ) { }

  create(createTapDto: CreateTapDto) {
    return 'This action adds a new tap';
  }

  async updateUserSocketId(idTelegram: string, socketId: string) {
    console.log('1: ', idTelegram, socketId)
    const user = await this.userRepository.findOneBy({ idTelegram })
    if (user) {

      console.log('2: ', idTelegram, socketId)
      return await this.userRepository.save({ ...user, socketId });
    }
    console.log('3: ', idTelegram, socketId)

  }

  async clickTap(idTelegram: string, socketId: string) {

    console.log('clickTap', idTelegram, socketId)

    const user = await this.userRepository.findOne({ where: { idTelegram, socketId }, })
    if (!user) { return }
    console.log(user.coins)
    const coins = user.coins + 1
    if (user.energy <= 0) {
      throw new BadRequestException('Not enough!')
    }
    const energy = user.energy - 1
    console.log(user.coins)
    return await this.userRepository.save({ ...user, coins, energy });
  }

  async onUpdate(idTelegram: string, socketId: string): Promise<number> {
    // const user = this.userRepository.findOneBy({ idTelegram, socketId })
    return await this.userService.updateOnline(idTelegram)
  }

  findAll() {
    return `This action returns all tap`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tap`;
  }

  update(id: number, updateTapDto: UpdateTapDto) {
    return `This action updates a #${id} tap`;
  }

  remove(id: number) {
    return `This action removes a #${id} tap`;
  }
}
