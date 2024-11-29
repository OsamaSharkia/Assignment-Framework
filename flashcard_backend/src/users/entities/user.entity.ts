import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from '../../flashcards/entities/comment.entity';
import { FlashcardSet } from '../../flashcards/entities/flashcard-set.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number; // Automatically generated ID with auto-increment.

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => FlashcardSet, (flashcardSet) => flashcardSet.user)
  flashcardSets: FlashcardSet[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];
}
