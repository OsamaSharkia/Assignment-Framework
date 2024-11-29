import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne,CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { FlashCard } from './flashcard.entity';
import { Comment } from './comment.entity';
import { Collection } from '../../collections/entities/collection.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class FlashcardSet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => FlashCard, (flashcard) => flashcard.set, { cascade: true })
  cards: FlashCard[];

  @OneToMany(() => Comment, (comment) => comment.set, { cascade: true })
  comments: Comment[];

  @ManyToOne(() => Collection, (collection) => collection.sets, { onDelete: 'CASCADE', nullable: true })
  collection: Collection;

  @ManyToOne(() => User, (user) => user.flashcardSets, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({ type: 'datetime' }) // Change from timestamp to datetime
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' }) // Change from timestamp to datetime
  updatedAt: Date;
}

