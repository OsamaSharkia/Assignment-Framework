import { Test, TestingModule } from '@nestjs/testing';
import { FlashcardsController } from './flashcards.controller';
import { FlashcardsService } from './flashcards.service';
import { FlashcardSet } from './entities/flashcard-set.entity';
import { FlashCard } from './entities/flashcard.entity';
import { Difficulty } from './dto/difficulty.enum';
import { Collection } from '../collections/entities/collection.entity';
import { User } from '../users/entities/user.entity';

describe('FlashcardsController', () => {
  let controller: FlashcardsController;
  let service: FlashcardsService;

  const mockUser: Partial<User> = {
    id: 1,
    username: 'testuser',
  };

  const mockCollection: Partial<Collection> = {
    id: 1,
    name: 'Test Collection',
  };

  const mockFlashcardSet: Partial<FlashcardSet> = {
    id: 1,
    name: 'Test Set',
    cards: [],
    comments: [],
    collection: mockCollection as Collection,
    user: mockUser as User,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlashcardsController],
      providers: [
        {
          provide: FlashcardsService,
          useValue: {
            findAllSets: jest.fn(),
            findSetById: jest.fn(),
            createSet: jest.fn(),
            updateSetById: jest.fn(),
            deleteSetById: jest.fn(),
            addFlashcard: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FlashcardsController>(FlashcardsController);
    service = module.get<FlashcardsService>(FlashcardsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllSets', () => {
    it('should return an array of flashcard sets', async () => {
      jest.spyOn(service, 'findAllSets').mockResolvedValue([mockFlashcardSet as FlashcardSet]);
      expect(await controller.getAllSets()).toEqual([mockFlashcardSet]);
    });
  });

  describe('getSetById', () => {
    it('should return a flashcard set by id', async () => {
      jest.spyOn(service, 'findSetById').mockResolvedValue(mockFlashcardSet as FlashcardSet);
      expect(await controller.getSetById(1)).toEqual(mockFlashcardSet);
    });
  });

  describe('createSet', () => {
    it('should create a new flashcard set', async () => {
      const createDto = {
        name: 'New Set',
        cards: [],
        comments: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const result = { ...mockFlashcardSet, ...createDto };
      jest.spyOn(service, 'createSet').mockResolvedValue(result as FlashcardSet);
      expect(await controller.createSet(createDto)).toEqual(result);
    });
  });

  describe('updateSetById', () => {
    it('should update an existing flashcard set', async () => {
      const updateDto = {
        name: 'Updated Set',
        cards: [],
        comments: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const result = { ...mockFlashcardSet, ...updateDto };
      jest.spyOn(service, 'updateSetById').mockResolvedValue(result as FlashcardSet);
      expect(await controller.updateSetById(1, updateDto)).toEqual(result);
    });
  });

  describe('deleteSetById', () => {
    it('should delete a flashcard set', async () => {
      jest.spyOn(service, 'deleteSetById').mockResolvedValue(undefined);
      await expect(controller.deleteSetById(1)).resolves.not.toThrow();
    });
  });

  describe('addFlashcard', () => {
    it('should add a flashcard to a set', async () => {
      const createFlashcardDto = {
        question: 'Test Question',
        answer: 'Test Answer',
        difficulty: Difficulty.MEDIUM,
      };

      const mockFlashcard: Partial<FlashCard> = {
        id: 1,
        ...createFlashcardDto,
        set: mockFlashcardSet as FlashcardSet,
      };

      jest.spyOn(service, 'addFlashcard').mockResolvedValue(mockFlashcard as FlashCard);
      expect(await controller.addFlashcard(1, createFlashcardDto)).toEqual(mockFlashcard);
    });
  });
});

