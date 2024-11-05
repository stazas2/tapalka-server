import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsJSON, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { IRefUser } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @IsNumber()
    idTelegram?: string

    @IsOptional()
    @IsString()
    username?: string

    @IsOptional()
    @IsNumber()
    level?: number

    @IsOptional()
    @IsNumber()
    salary?: number

    @IsOptional()
    @IsNumber()
    energy?: number

    @IsOptional()
    @IsString()
    dateRegistartion?: string

    @IsOptional()
    @IsString()
    dateSalary?: string

    @IsOptional()
    @IsString()
    dateUpdated?: string

    @IsOptional()
    @IsString()
    dateOnline?: string

    @IsOptional()
    @IsString()
    dateOnlineDaily?: string

    @IsOptional()
    @IsNumber()
    dailyCounter?: number

    @IsOptional()
    @IsNumber()
    rating?: number

    @IsOptional()
    @IsString()
    socketId?: string

    @IsOptional()
    @IsJSON()
    refUsers?: IRefUser[]


    // @IsOptional()
    // @IsNumber()

}
