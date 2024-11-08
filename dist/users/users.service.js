"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const user_card_entity_1 = require("../user-cards/entities/user-card.entity");
let UsersService = class UsersService {
    constructor(userRepository, userCardsRepository) {
        this.userRepository = userRepository;
        this.userCardsRepository = userCardsRepository;
    }
    async create(createUserDto, idTelegramRef = "") {
        const dateRegistartion = new Date().valueOf().toString();
        const dateOnline = dateRegistartion;
        const userExist = await this.userRepository.findOneBy({ idTelegram: createUserDto.idTelegram });
        console.log('userExist', userExist);
        if (!userExist) {
            const userNew = this.userRepository.create({ ...createUserDto, dateRegistartion, dateOnline });
            if (idTelegramRef && idTelegramRef !== "") {
                const userRefExist = await this.userRepository.findOne({ where: { idTelegram: idTelegramRef } });
                if (userRefExist) {
                    if (!userRefExist.referralUsersJSON) {
                        userRefExist.referralUsersJSON = [];
                    }
                    console.log('userRefExist', userRefExist, userNew);
                    userRefExist.referralUsersJSON.push({ idTelegram: userNew.idTelegram, username: userNew.username });
                    userRefExist.coins += 1000;
                    userNew.coins = 1000;
                    await this.userRepository.save(userRefExist);
                    console.log(`New User (id: ${userNew._id}; idTelegram: ${userNew.idTelegram}) with Ref idTelegram: ${userRefExist.idTelegram}`);
                    const user = await this.userRepository.save(userNew);
                    return user;
                }
                else {
                    console.log(`New User (id: ${userNew._id}; idTelegram: ${userNew.idTelegram})`);
                    const user = await this.userRepository.save(userNew);
                    return user;
                }
            }
            else {
                console.log(`New User (id: ${userNew._id}; idTelegram: ${userNew.idTelegram})`);
                const user = await this.userRepository.save(userNew);
                return user;
            }
        }
        else {
            return userExist;
        }
    }
    async updateOnline(idTelegram) {
        const dateOnline = new Date().valueOf().toString();
        console.log('check user?', idTelegram);
        const userNew = await this.userRepository.findOneBy({ idTelegram });
        if (!userNew) {
            return;
        }
        console.log('user1: ', userNew.idTelegram);
        const diff = +dateOnline - +userNew.dateOnline;
        const diffHour = +(diff / 1000 / 60 / 60) <= 3 ? +(diff / 1000 / 60 / 60) : 3;
        const salary = +((diffHour * userNew.salary).toFixed(0));
        if (salary < 1) {
            console.log('no salary today!');
            return 0;
        }
        console.log('some salary: +', salary);
        userNew.coins += salary;
        await this.userRepository.save({ ...userNew, dateOnline });
        return salary;
    }
    async tap(_id) {
        const currentUser = await this.userRepository.findOneBy({ _id });
        if (currentUser.energy <= 0) {
            throw new common_1.BadRequestException('No energy');
        }
        const updatedUser = {
            ...currentUser,
            coins: currentUser.coins + 1,
            energy: --currentUser.energy,
        };
        return this.userRepository.save(updatedUser);
    }
    async recalculateSalary(_id) {
        console.log('userRecalculate id: ', _id);
        const user = await this.userRepository.findOneBy({ _id });
        console.log('userRecalculate: ', user);
        const userCards = await this.userCardsRepository.findBy({ user: { _id } });
        console.log('userRecalculate: ', userCards);
        const salary = userCards.reduce((acc, item) => { console.log(item); return acc + item.salary; }, 0);
        console.log('userCurrentSalary!: ', salary);
        return await this.userRepository.save({ ...user, salary });
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(idTelegram) {
        return await this.userRepository.findOneBy({ idTelegram });
    }
    async findOneByTelegramId(idTelegram) {
        const currentUser = await this.userRepository.findOneBy({ idTelegram });
        return currentUser;
    }
    async update(_id, updateUserDto) {
        const dateUpdated = new Date().valueOf().toString();
        return await this.userRepository.save({ ...updateUserDto, dateUpdated });
    }
    async getMyRefUsers(idTelegram) {
        console.log('get Friends', idTelegram);
        const user = await this.userRepository.findOne({ where: { idTelegram } });
        console.log('user: ', user);
        return user;
    }
    async onClickQuest(idTelegram, idQuest) {
        console.log('quest: ', idTelegram, idQuest);
        const user = await this.userRepository.findOneBy({ idTelegram });
        console.log('currentUser: ', user);
        user.coins += user.questsUsersJSON.find((q) => +q.id === +idQuest).salary;
        user.questsUsersJSON = user.questsUsersJSON.map((q) => +q.id === +idQuest ? { ...q, isCompleted: true } : q);
        console.log('newUser: ', user);
        return this.userRepository.save(user);
    }
    async onClickDailyQuest(idTelegram) {
        const salaryDateList = [200, 500, 1000, 1500, 2000, 3000, 1000, 1000, 1000];
        console.log('quest: ', idTelegram);
        const user = await this.userRepository.findOneBy({ idTelegram });
        console.log('currentUser: ', user);
        const currentDate = new Date().valueOf();
        const isMore = isMoreThanOneDayApart(user.dateOnlineDaily, currentDate);
        const isLess = isLessThanOneCalendarDayApartAndNotToday(user.dateOnlineDaily, currentDate);
        user.dateOnlineDaily = currentDate.toString();
        if (isMore) {
            user.dailyCounter = 0;
        }
        else if (!isMore) {
            user.dailyCounter += 1;
        }
        else if (isLess) {
            return;
        }
        if (user.dailyCounter > 8) {
            user.dailyCounter = 1;
        }
        console.log('salary: ', salaryDateList[user.dailyCounter]);
        user.isDailyTaken = true;
        user.coins += salaryDateList[user.dailyCounter];
        console.log('updatedUser: ', user);
        return this.userRepository.save(user);
    }
    async getIsDailyTaken(idTelegram) {
        const user = await this.userRepository.findOneBy({ idTelegram });
        return { isDailyTaken: user.isDailyTaken, counter: user.dailyCounter };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(user_card_entity_1.UserCard)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
function isMoreThanOneDayApart(date1, date2) {
    const startDate = new Date(date1);
    const finishDate = new Date(date2);
    const startOfDay1 = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const startOfDay2 = new Date(finishDate.getFullYear(), finishDate.getMonth(), finishDate.getDate());
    console.log('firstDay: ', startOfDay1);
    console.log('secondDay: ', startOfDay2);
    const differenceInMilliseconds = Math.abs(+startOfDay1 - +startOfDay2);
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return differenceInDays > 1;
}
function isLessThanOneCalendarDayApartAndNotToday(date1, date2) {
    const startDate = new Date(date1);
    const finishDate = new Date(date2);
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfDay1 = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const startOfDay2 = new Date(finishDate.getFullYear(), finishDate.getMonth(), finishDate.getDate());
    const isNotToday = startOfDay1.getTime() !== startOfToday.getTime() && startOfDay2.getTime() !== startOfToday.getTime();
    const differenceInDays = Math.abs((+startOfDay2 - +startOfDay1) / (1000 * 60 * 60 * 24));
    const isLessThanOneDayApart = differenceInDays < 1;
    return isNotToday && isLessThanOneDayApart;
}
//# sourceMappingURL=users.service.js.map