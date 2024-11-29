import { FlashcardSet } from '../../flashcards/entities/flashcard-set.entity';
import { Comment } from '../../flashcards/entities/comment.entity';
export declare class Collection {
    id: number;
    name: string;
    sets: FlashcardSet[];
    comments: Comment[];
}
