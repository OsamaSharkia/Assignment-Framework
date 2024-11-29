import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { FlashcardSet } from './flashcard-set.entity';

@Entity()
export class FlashCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column({ nullable: true })
  difficulty: string;

  @ManyToOne(() => FlashcardSet, (flashcardSet) => flashcardSet.cards, { onDelete: 'CASCADE' })
  set: FlashcardSet;
}
