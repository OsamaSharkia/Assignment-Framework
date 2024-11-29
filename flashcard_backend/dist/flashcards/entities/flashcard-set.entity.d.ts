import { FlashCard } from './flashcard.entity';
import { Comment } from './comment.entity';
import { Collection } from '../../collections/entities/collection.entity';
import { User } from '../../users/entities/user.entity';
export declare class FlashcardSet {
    id: number;
    name: string;
    cards: FlashCard[];
    comments: Comment[];
    collection: Collection;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
