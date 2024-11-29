import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { FlashcardSet } from './flashcard-set.entity';
import { Collection } from '../../collections/entities/collection.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  
  @Column({ nullable: true }) 
  content: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => FlashcardSet, (flashcardSet) => flashcardSet.comments, { onDelete: 'CASCADE' })
  set: FlashcardSet;

  @ManyToOne(() => Collection, (collection) => collection.comments, { onDelete: 'CASCADE' })
  collection: Collection;
}
