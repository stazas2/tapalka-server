import { BadRequestException, Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-userNew.dto';
// import { UpdateUserDto } from './dto/update-userNew.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { UserCard } from 'src/user-cards/entities/user-card.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import User, { IRefUser } from './entities/userNew.entity';
// import { UserCard } from 'src/userNew-cards/entities/userNew-card.entity';

// type IUser = {
//   idTelegram?: number
//   username?: string
//   level?: number
//   salary?: number
//   rating?: number
//   registartionDate?: number
// }

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserCard)
    private userCardsRepository: Repository<UserCard>
  ) { }

  async create(createUserDto: CreateUserDto, idTelegramRef = ""): Promise<User> {

    const dateRegistartion = new Date().valueOf().toString()
    const dateOnline = dateRegistartion

    const userExist = await this.userRepository.findOneBy({ idTelegram: createUserDto.idTelegram })
    console.log('userExist', userExist)

    // ------------------------- IF USER DOESN'T EXIST

    if (!userExist) {

      const userNew = this.userRepository.create({ ...createUserDto, dateRegistartion, dateOnline });

      // ---------------------- REF SIDE

      if (idTelegramRef && idTelegramRef !== "") {

        const userRefExist = await this.userRepository.findOne({ where: { idTelegram: idTelegramRef } })
        // -------------------- IF REF IS GOOD
        if (userRefExist) {

          if (!userRefExist.referralUsersJSON) {
            userRefExist.referralUsersJSON = []
          }

          console.log('userRefExist', userRefExist, userNew)
          userRefExist.referralUsersJSON.push({ idTelegram: userNew.idTelegram, username: userNew.username })

          userRefExist.coins += 1000
          userNew.coins = 1000

          await this.userRepository.save(userRefExist);

          console.log(`New User (id: ${userNew._id}; idTelegram: ${userNew.idTelegram}) with Ref idTelegram: ${userRefExist.idTelegram}`)

          const user = await this.userRepository.save(userNew);
          return user

          // -------------------- IF REF IS BAD
        } else {

          console.log(`New User (id: ${userNew._id}; idTelegram: ${userNew.idTelegram})`)
          const user = await this.userRepository.save(userNew);
          return user
        }

        // -------------------- NO REF
      } else {
        // const userNew = this.userRepository.create({ ...createUserDto, dateRegistartion, dateOnline });
        console.log(`New User (id: ${userNew._id}; idTelegram: ${userNew.idTelegram})`)
        const user = await this.userRepository.save(userNew);
        return user

      }

    } else {
      return userExist
    }

  }


  async updateOnline(idTelegram: string): Promise<number> {

    // Update Online
    const dateOnline = new Date().valueOf().toString()

    console.log('check user?', idTelegram)

    const userNew = await this.userRepository.findOneBy({ idTelegram })


    if (!userNew) {
      return
    }

    console.log('user1: ', userNew.idTelegram)

    const diff = +dateOnline - +userNew.dateOnline
    const diffHour = +(diff / 1000 / 60 / 60) <= 3 ? +(diff / 1000 / 60 / 60) : 3
    const salary = +((diffHour * userNew.salary).toFixed(0))

    if (salary < 1) {
      console.log('no salary today!')
      return 0
    }
    console.log('some salary: +', salary)
    userNew.coins += salary

    await this.userRepository.save({ ...userNew, dateOnline });
    return salary
  }

  // async createRef(idTelegram: string, refId: string): Promise<User> {

  //   // const dateRegistartion = new Date().valueOf().toString()
  //   // const dateOnline = dateRegistartion

  //   const userNew = await this.userRepository.findOneBy({ idTelegram });
  //   const refUser = await this.userRepository.findOneBy({ idTelegram: refId });

  //   if (userNew && refUser) {

  //   } else {
  //     throw new BadRequestException('User doesn\'t exist');
  //   }
  //   // if (!userExist) {
  //   return await this.userRepository.save({ ...userNew, });
  //   // }

  // }

  async tap(_id: number): Promise<User> {

    const currentUser = await this.userRepository.findOneBy({ _id })

    if (currentUser.energy <= 0) {
      throw new BadRequestException('No energy')
    }

    const updatedUser = {
      ...currentUser,
      coins: currentUser.coins + 1,
      energy: --currentUser.energy,
    }

    return this.userRepository.save(updatedUser);
  }





  // async create(createUserDto: CreateUserDto) {

  //   const dateCurrent = new Date().valueOf()

  //   const userNew = {
  //     ...createUserDto,
  //     dateRegistartion: dateCurrent.toString(),
  //   }

  //   return await this.userRepository.save(userNew)
  // }

  async recalculateSalary(_id: number) {

    console.log('userRecalculate id: ', _id)
    const user = await this.userRepository.findOneBy({ _id })

    console.log('userRecalculate: ', user)

    const userCards = await this.userCardsRepository.findBy({ user: { _id } })

    console.log('userRecalculate: ', userCards)

    // console.log(userCards)

    const salary = userCards.reduce((acc, item) => { console.log(item); return acc + item.salary }, 0)

    console.log('userCurrentSalary!: ', salary)
    return await this.userRepository.save({ ...user, salary })
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(idTelegram: string) {
    return await this.userRepository.findOneBy({ idTelegram });
  }

  async findOneByTelegramId(idTelegram: string) {

    // console.log('CURRENT TG ID: ', idTelegram)
    const currentUser = await this.userRepository.findOneBy({ idTelegram });
    // console.log('CURRENT USER: ', currentUser)

    return currentUser
  }

  async update(_id: number, updateUserDto: UpdateUserDto): Promise<User> {

    // _ Initialization

    const dateUpdated = new Date().valueOf().toString()

    // console.log(_id, updateUserDto)
    // try {
    //   const userCurrent = await this.userRepository.findOneBy({ _id })


    //   // Business Logic

    //   // const userUpdated: User = {
    //   //   // idTelegram: updateUserDto.idTelegram,
    //   //   ...updateUserDto,
    //   //   dateUpdated: dateCurrent,
    //   // }

    //   // const userUpdatedStatus = await this.userRepository.save(userUpdated);

    //   if (userUpdatedStatus.dateUpdated !== dateCurrent) {
    //     throw new BadRequestException('Update failed')
    //   }

    //   // _ Deinitialization
    //   return userUpdatedStatus

    // } catch (err) {
    //   return err
    // }

    return await this.userRepository.save({ ...updateUserDto, dateUpdated });


  }

  // remove(id: number) {
  //   return `This action removes a #${id} userNew`;
  // }





  // ----------------------- OTHERS



  async getMyRefUsers(idTelegram: string): Promise<User> {
    console.log('get Friends', idTelegram)
    const user = await this.userRepository.findOne({ where: { idTelegram } })
    console.log('user: ', user)
    return user
  }


  async onClickQuest(idTelegram: string, idQuest: number) {
    console.log('quest: ', idTelegram, idQuest)
    const user = await this.userRepository.findOneBy({ idTelegram })
    console.log('currentUser: ', user)
    user.coins += user.questsUsersJSON.find((q: any) => +q.id === +idQuest).salary
    user.questsUsersJSON = user.questsUsersJSON.map((q: any) => +q.id === +idQuest ? { ...q, isCompleted: true } : q)

    console.log('newUser: ', user)

    return this.userRepository.save(user)
  }

  async onClickDailyQuest(idTelegram: string) {

    const salaryDateList = [200, 500, 1000, 1500, 2000, 3000, 1000, 1000, 1000]

    console.log('quest: ', idTelegram)
    const user = await this.userRepository.findOneBy({ idTelegram })
    console.log('currentUser: ', user)
    const currentDate = new Date().valueOf()

    // const { dateOnlineDaily, dailyCounter} = user

    const isMore = isMoreThanOneDayApart(user.dateOnlineDaily, currentDate)
    const isLess = isLessThanOneCalendarDayApartAndNotToday(user.dateOnlineDaily, currentDate)
    user.dateOnlineDaily = currentDate.toString()


    if (isMore) {
      user.dailyCounter = 0
    } else if (!isMore) {
      user.dailyCounter += 1
    } else if (isLess) {
      return
    }

    if (user.dailyCounter > 8) {
      user.dailyCounter = 1
    }

    // const counter = salaryDateList[user.dailyCounter]

    console.log('salary: ', salaryDateList[user.dailyCounter])

    user.isDailyTaken = true
    user.coins += salaryDateList[user.dailyCounter]

    console.log('updatedUser: ', user)

    return this.userRepository.save(user)
  }

  async getIsDailyTaken(idTelegram: string) {
    const user = await this.userRepository.findOneBy({ idTelegram })
    // const isLess = isLessThanOneCalendarDayApartAndNotToday(user.dateOnlineDaily, new Date().valueOf())
    return { isDailyTaken: user.isDailyTaken, counter: user.dailyCounter }
  }

}

function isMoreThanOneDayApart(date1, date2) {

  const startDate = new Date(date1)
  const finishDate = new Date(date2)

  // Преобразуем даты в начало дня (чтобы игнорировать время)
  const startOfDay1 = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const startOfDay2 = new Date(finishDate.getFullYear(), finishDate.getMonth(), finishDate.getDate());

  console.log('firstDay: ', startOfDay1)
  console.log('secondDay: ', startOfDay2)
  // Разница в миллисекундах между датами
  const differenceInMilliseconds = Math.abs(+startOfDay1 - +startOfDay2);

  // Преобразуем разницу в дни
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return differenceInDays > 1;
}

function isLessThanOneCalendarDayApartAndNotToday(date1, date2) {
  // Получаем текущую дату (только год, месяц и день)
  const startDate = new Date(date1)
  const finishDate = new Date(date2)

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Преобразуем проверяемые даты в начало дня
  const startOfDay1 = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const startOfDay2 = new Date(finishDate.getFullYear(), finishDate.getMonth(), finishDate.getDate());

  // Проверка: обе даты не являются сегодняшним днем
  const isNotToday = startOfDay1.getTime() !== startOfToday.getTime() && startOfDay2.getTime() !== startOfToday.getTime();

  // Проверка: разница меньше одного календарного дня
  const differenceInDays = Math.abs((+startOfDay2 - +startOfDay1) / (1000 * 60 * 60 * 24));
  const isLessThanOneDayApart = differenceInDays < 1;

  return isNotToday && isLessThanOneDayApart;
}