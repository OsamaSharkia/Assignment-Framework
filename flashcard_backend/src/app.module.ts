import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CollectionsModule } from './collections/collections.module';
import { User } from './users/entities/user.entity';
import { FlashcardSet } from './flashcards/entities/flashcard-set.entity';
import { FlashCard } from './flashcards/entities/flashcard.entity';
import { Collection } from './collections/entities/collection.entity';
import { Comment } from './flashcards/entities/comment.entity';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Comment,FlashcardSet, FlashCard, Collection],
      synchronize: true,
     
    }),
    FlashcardsModule,
    UsersModule,
    CollectionsModule,
    AuthModule,
  ],
})
export class AppModule {}
