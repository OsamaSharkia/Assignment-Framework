import { FlashcardSet } from './flashcard-set.entity';
export declare class FlashCard {
    id: number;
    question: string;
    answer: string;
    difficulty: string;
    set: FlashcardSet;
}
