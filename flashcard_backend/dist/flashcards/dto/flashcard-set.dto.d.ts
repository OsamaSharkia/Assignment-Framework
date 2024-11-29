import { FlashCardDto } from './flashcard.dto';
import { CommentDto } from './comment.dto';
export declare class FlashcardSetDto {
    name: string;
    cards: FlashCardDto[];
    comments: CommentDto[];
    created_at: string;
    updated_at: string;
}
