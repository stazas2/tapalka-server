import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CronService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  private readonly logger = new Logger(CronService.name);

  // @Cron('0 0 12,0 * * *')
  // @Cron('0 23,0 * * * *')
  @Cron(CronExpression.EVERY_3_HOURS)
  async handleCron() {

    const users = await this.userRepository.find()
    const updatedUsers = users.map(user => ({ ...user, energy: 100 }))

    await this.userRepository.save(updatedUsers)

    this.logger.debug('UPDATED ENERGY!');
  }


  @Cron(CronExpression.EVERY_3_HOURS)
  // @Cron(CronExpression.EVERY_MINUTE)
  async handleCronCalculateUsersRating() {

    let users = await this.userRepository.find()
    // console.log('allUsers', users)
    users.sort((userPrevious, userNext) => userPrevious.salary - userNext.salary)
    const usersRating = users.map((user, idx) => ({ ...user, rating: idx + 1 }))
    const updatedUsers = usersRating.map(user => ({ ...user, energy: 100 }))

    await this.userRepository.save(updatedUsers)

    // console.log('Called')
    this.logger.debug('UPDATED RATING!');
  }


  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  // @Cron(CronExpression.EVERY_MINUTE)
  async handleCronUpdateIsDailyTaken() {

    let users = await this.userRepository.find()
    // console.log('allUsers', users)
    // users.sort((userPrevious, userNext) => userPrevious.salary - userNext.salary)
    const usersUpdated = users.map((user, idx) => ({ ...user, isDailyTaken: false }))
    // const updatedUsers = usersRating.map(user => ({ ...user, energy: 100 }))

    await this.userRepository.save(usersUpdated)

    // console.log('Called')
    this.logger.debug('UPDATED RATING!');
  }
}
