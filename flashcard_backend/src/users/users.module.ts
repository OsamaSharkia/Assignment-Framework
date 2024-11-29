import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Providing UserRepository via TypeORM
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule], // Export UsersService and TypeOrmModule
})
export class UsersModule {}