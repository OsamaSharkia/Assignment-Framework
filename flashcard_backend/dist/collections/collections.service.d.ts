import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { CollectionDto } from './dto/collection.dto';
import { FlashcardSet } from '../flashcards/entities/flashcard-set.entity';
import { CommentDto } from '../flashcards/dto/comment.dto';
import { Comment } from '../flashcards/entities/comment.entity';
export declare class CollectionsService {
    private readonly collectionRepository;
    private readonly flashcardSetRepository;
    private readonly commentRepository;
    constructor(collectionRepository: Repository<Collection>, flashcardSetRepository: Repository<FlashcardSet>, commentRepository: Repository<Comment>);
    findAllCollections(): Promise<Collection[]>;
    redirectToRandomCollection(): Promise<Collection>;
    findCollectionById(id: number): Promise<Collection>;
    createCollection(collectionDto: CollectionDto): Promise<Collection>;
    updateCollectionById(id: number, collectionDto: CollectionDto): Promise<Collection>;
    addCommentToCollection(collectionId: number, commentDto: CommentDto): Promise<Comment>;
    deleteCollectionById(id: number): Promise<void>;
}
