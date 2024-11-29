import { Comment } from '../../flashcards/entities/comment.entity';
import { FlashcardSet } from '../../flashcards/entities/flashcard-set.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    flashcardSets: FlashcardSet[];
    comments: Comment[];
}
