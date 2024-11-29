import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { FlashcardSet } from '../../flashcards/entities/flashcard-set.entity';
import { Comment } from '../../flashcards/entities/comment.entity';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => FlashcardSet, (flashcardSet) => flashcardSet.collection, { eager: true })
  @JoinTable()
  sets: FlashcardSet[];

  @OneToMany(() => Comment, (comment) => comment.collection, { cascade: true })
  comments: Comment[];
}
