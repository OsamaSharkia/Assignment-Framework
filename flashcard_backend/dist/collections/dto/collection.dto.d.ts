import { FlashcardSetDto } from '../../flashcards/dto/flashcard-set.dto';
export declare class CollectionDto {
    name: string;
    sets: FlashcardSetDto[];
    flashcardSetId?: number;
    comment: string;
}
