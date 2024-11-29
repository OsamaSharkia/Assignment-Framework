import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { Collection } from './entities/collection.entity';
import { FlashcardSet } from '../flashcards/entities/flashcard-set.entity';
import { Comment } from '../flashcards/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection, FlashcardSet, Comment]), // Register the Collection, FlashcardSet, and Comment entities
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService],
  exports: [CollectionsService], // Export the service if needed by other modules
})
export class CollectionsModule {}
