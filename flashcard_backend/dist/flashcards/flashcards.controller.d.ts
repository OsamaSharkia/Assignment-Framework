import { FlashcardsService } from './flashcards.service';
import { FlashcardSetDto } from './dto/flashcard-set.dto';
import { FlashCardDto } from './dto/flashcard.dto';
import { FlashcardSet } from './entities/flashcard-set.entity';
export declare class FlashcardsController {
    private readonly flashcardsService;
    constructor(flashcardsService: FlashcardsService);
    getAllSets(): Promise<FlashcardSet[]>;
    getSetById(setId: number): Promise<FlashcardSet>;
    createSet(setDto: FlashcardSetDto): Promise<FlashcardSet>;
    updateSetById(setId: number, setDto: FlashcardSetDto): Promise<FlashcardSet>;
    deleteSetById(setId: number): Promise<void>;
    addFlashcard(setId: number, createFlashcardDto: FlashCardDto): Promise<import("./entities/flashcard.entity").FlashCard>;
}
