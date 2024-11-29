import { User } from '../../users/entities/user.entity';
import { FlashcardSet } from './flashcard-set.entity';
import { Collection } from '../../collections/entities/collection.entity';
export declare class Comment {
    id: number;
    content: string;
    user: User;
    set: FlashcardSet;
    collection: Collection;
}
