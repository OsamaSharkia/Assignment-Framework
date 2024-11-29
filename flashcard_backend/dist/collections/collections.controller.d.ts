import { CollectionsService } from './collections.service';
import { CollectionDto } from './dto/collection.dto';
import { CommentDto } from '../flashcards/dto/comment.dto';
export declare class CollectionsController {
    private readonly collectionsService;
    constructor(collectionsService: CollectionsService);
    findAllCollections(): Promise<import("./entities/collection.entity").Collection[]>;
    redirectToRandomCollection(): Promise<import("./entities/collection.entity").Collection>;
    findCollectionById(id: number): Promise<import("./entities/collection.entity").Collection>;
    createCollection(collectionDto: CollectionDto): Promise<import("./entities/collection.entity").Collection>;
    updateCollectionById(id: number, collectionDto: CollectionDto): Promise<import("./entities/collection.entity").Collection>;
    deleteCollectionById(id: number): Promise<void>;
    addCommentToCollection(id: number, commentDto: CommentDto): Promise<import("../flashcards/entities/comment.entity").Comment>;
}
