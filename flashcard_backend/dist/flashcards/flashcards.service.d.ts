import { Repository } from 'typeorm';
import { FlashcardSet } from './entities/flashcard-set.entity';
import { FlashcardSetDto } from './dto/flashcard-set.dto';
import { FlashCardDto } from './dto/flashcard.dto';
import { FlashCard } from './entities/flashcard.entity';
import { Comment } from './entities/comment.entity';
export declare class FlashcardsService {
    private flashcardSetRepository;
    private flashCardRepository;
    private commentRepository;
    constructor(flashcardSetRepository: Repository<FlashcardSet>, flashCardRepository: Repository<FlashCard>, commentRepository: Repository<Comment>);
    findAllSets(): Promise<FlashcardSet[]>;
    findSetById(setId: number): Promise<FlashcardSet>;
    createSet(createFlashcardSetDto: FlashcardSetDto): Promise<FlashcardSet>;
    updateSetById(setId: number, setDto: FlashcardSetDto): Promise<FlashcardSet>;
    deleteSetById(setId: number): Promise<void>;
    addFlashcard(setId: number, createFlashcardDto: FlashCardDto): Promise<FlashCard>;
}
