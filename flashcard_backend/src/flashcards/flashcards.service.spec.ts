import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlashcardsService } from './flashcards.service';
import { FlashcardSet } from './entities/flashcard-set.entity';
import { FlashCard } from './entities/flashcard.entity';
import { Comment } from './entities/comment.entity';
import { NotFoundException } from '@nestjs/common';
import { Collection } from '../collections/entities/collection.entity';
import { User } from '../users/entities/user.entity';
import { FlashcardSetDto } from './dto/flashcard-set.dto';

describe('FlashcardsService', () => {
  let service: FlashcardsService;
  let flashcardSetRepository: Repository<FlashcardSet>;
  let flashCardRepository: Repository<FlashCard>;
  let commentRepository: Repository<Comment>;

  const mockDate = new Date('2024-11-29T15:38:01.314Z');

  const mockUser: Partial<User> = {
    id: 1,
    username: 'testuser',
  };

  const mockCollection: Partial<Collection> = {
    id: 1,
    name: 'Test Collection',
  };

  const mockFlashcardSetDto: FlashcardSetDto = {
    name: 'Test Set',
    cards: [],
    comments: [],
    created_at: mockDate.toISOString(),
    updated_at: mockDate.toISOString()
  };

  const mockFlashcardSet: Partial<FlashcardSet> = {
    id: 1,
    name: 'Test Set',
    cards: [],
    comments: [],
    collection: mockCollection as Collection,
    user: mockUser as User,
    createdAt: mockDate,
    updatedAt: mockDate,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlashcardsService,
        {
          provide: getRepositoryToken(FlashcardSet),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(FlashCard),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FlashcardsService>(FlashcardsService);
    flashcardSetRepository = module.get<Repository<FlashcardSet>>(getRepositoryToken(FlashcardSet));
    flashCardRepository = module.get<Repository<FlashCard>>(getRepositoryToken(FlashCard));
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
  });

  describe('updateSetById', () => {
    it('should update an existing flashcard set', async () => {
      const updateDto: FlashcardSetDto = {
        name: 'Updated Set',
        cards: [],
        comments: [],
        created_at: mockDate.toISOString(),
        updated_at: mockDate.toISOString()
      };

      const existingSet = { ...mockFlashcardSet };
      const updatedSet = {
        ...existingSet,
        name: updateDto.name,
        cards: updateDto.cards,
        comments: updateDto.comments,
        updatedAt: mockDate,
      };

      jest.spyOn(service, 'findSetById').mockResolvedValue(existingSet as FlashcardSet);
      jest.spyOn(flashcardSetRepository, 'save').mockResolvedValue(updatedSet as FlashcardSet);

      const result = await service.updateSetById(1, updateDto);
      expect(result).toEqual(updatedSet);
    });

    it('should throw NotFoundException if set does not exist', async () => {
      const updateDto: FlashcardSetDto = {
        name: 'Updated Set',
        cards: [],
        comments: [],
        created_at: mockDate.toISOString(),
        updated_at: mockDate.toISOString()
      };
      
      jest.spyOn(service, 'findSetById').mockRejectedValue(new NotFoundException());
      await expect(service.updateSetById(1, updateDto)).rejects.toThrow(NotFoundException);
    });
  });

  
});

