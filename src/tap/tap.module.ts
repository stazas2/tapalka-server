import { Module } from '@nestjs/common';
import { TapService } from './tap.service';
import { TapGateway } from './tap.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
  providers: [TapGateway, TapService],
})
export class TapModule { }
