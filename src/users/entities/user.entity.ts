
import { Team } from 'src/teams/entities/team.entity';
import { UserCard } from 'src/user-cards/entities/user-card.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


const questsDailyList = [
    {
        id: 1,
        isCompleted: false,
        isDaily: false,
        fullCounter: 9,
        currentCounter: 0,
        startDate: null,
        currentDate: null,
        // title: 'День',
        // salary: 1000,
        // url: 'https://google.com',
        // urlPicture: 'https://google.com',

    },
]

const questsList = [
    {
        id: 1,
        isCompleted: false,
        salary: 2500,
        title: 'Подписаться на наc в Telegram',
        url: 'https://google.com',
        urlPicture: 'https://google.com',
    },
    {
        id: 2,
        isCompleted: false,
        salary: 5000,
        title: 'Подписаться на наш канал',
        url: 'https://google.com',
        urlPicture: 'https://google.com',
    },
]


export type IRefUser = { userId: number }

@Entity()
class User {

    @PrimaryGeneratedColumn()
    _id?: number

    // Basic

    @Column({ nullable: false, default: '0' })
    idTelegram: string

    @Column({ default: 'Guest' })
    username: string

    @Column({ default: 1 })
    level: number

    @Column({ default: 0 })
    salary: number

    @Column({ default: 0 })
    rating: number

    @Column({ default: 100 })
    energy: number

    @Column({ default: 0 })
    coins: number

    // Dates

    @Column({ default: "0" })
    dateRegistartion: string

    @Column({ default: "0" })
    dateSalary: string

    @Column({ default: "0" })
    dateUpdated: string

    @Column({ default: "0" })
    dateOnline: string

    @Column({ default: "0" })
    dateOnlineDaily: string

    @Column({ default: false })
    isDailyTaken: boolean

    @Column({ default: 0 })
    dailyCounter: number

    @Column({ default: "0" })
    socketId: string


    // @ManyToOne(() => User, user => user.referralUsers)
    // referralUser: User

    // @ManyToOne(() => User, user => user.referralUsers, { nullable: true })
    // referralUser: User; // Ссылка на реферера

    // @OneToMany(() => User, user => user.referralUser)
    // referralUsers: User[]; // Массив рефералов

    @Column({ type: 'jsonb', nullable: true, default: [] })  // Тип поля json, допускается null
    referralUsersJSON: any;  // Вы можете указать `any` для хранения любых данных

    @Column({ type: 'jsonb', nullable: true, default: questsList })  // Тип поля json, допускается null
    questsUsersJSON: any;  // Вы можете указать `any` для хранения любых данных

    @Column({ type: 'jsonb', nullable: true, default: questsDailyList })  // Тип поля json, допускается null
    questsDailyUsersJSON: any;  // Вы можете указать `any` для хранения любых данных

    // @Column({ type: 'jsonb', nullable: true, default: null })
    // refUsers: IRefUser[]

    // Relations

    // @ManyToMany(type => Card, card => card.id)
    // cards: Card[]

    @OneToMany(() => UserCard, userCard => userCard.user)
    userCards: UserCard[];

    @ManyToMany(type => Team, team => team.id)
    teams: Team[]



    // @ManyToMany(type => User, user => user.id)
    // user: User[]

}

export default User;