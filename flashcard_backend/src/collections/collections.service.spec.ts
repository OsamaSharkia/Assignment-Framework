import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlashcardSet } from '../flashcards/entities/flashcard-set.entity';
import { CollectionsService } from './collections.service';
import { Collection } from './entities/collection.entity';
import { CollectionDto } from './dto/collection.dto';
import { NotFoundException } from '@nestjs/common';
import { Comment } from '../flashcards/entities/comment.entity';

describe('CollectionsService', () => {
  let service: CollectionsService;
  let repository: Repository<Collection>;

  const mockCollection = {
    id: 1,
    name: 'Test Collection',
    description: 'Test Description',
    sets: [],
    user: { id: 1, username: 'testuser' }
  };


  const mockCollectionRepository = {
    find: jest.fn().mockResolvedValue([mockCollection]),
    findOne: jest.fn().mockResolvedValue(mockCollection),
    create: jest.fn().mockReturnValue(mockCollection),
    save: jest.fn().mockResolvedValue(mockCollection),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  const mockFlashcardSetRepository = {
    findByIds: jest.fn().mockResolvedValue([]),
  };

  const mockCommentRepository = {
    create: jest.fn().mockReturnValue({ id: 1, content: 'Test Comment' }),
    save: jest.fn().mockResolvedValue({ id: 1, content: 'Test Comment' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectionsService,
        {
          provide: getRepositoryToken(Collection),
          useValue: mockCollectionRepository,
        },
        {
          provide: getRepositoryToken(FlashcardSet),
          useValue: mockFlashcardSetRepository,
        },
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository,
        },
      ],
    }).compile();

    service = module.get<CollectionsService>(CollectionsService);
    repository = module.get<Repository<Collection>>(getRepositoryToken(Collection));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCollections', () => {
    it('should return an array of collections', async () => {
      const result = await service.findAllCollections();
      expect(result).toEqual([mockCollection]);
    });
  });

  describe('getCollection', () => {
    it('should return a single collection', async () => {
      const result = await service.findCollectionById(1);
      expect(result).toEqual(mockCollection);
    });

    it('should throw NotFoundException when collection is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      await expect(service.findCollectionById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createCollection', () => {
    it('should create a collection', async () => {
      const dto: CollectionDto = {
        name: 'Test Collection',
        comment: 'Test Description',
        sets: []
      };
      const result = await service.createCollection(dto);
      expect(result).toEqual(mockCollection);
    });
  });

  describe('updateCollectionById', () => {
    it('should update a collection', async () => {
      const mockCollection = {
        id: 1,
        name: 'Test Collection',
        sets: [],
        comments: [],
      };
  
      const updatedDto = {
        name: 'Updated Collection',
        sets: [],
        comment: 'Updated comment',
      };
  
      jest.spyOn(service, 'findCollectionById').mockResolvedValue(mockCollection as any);
      jest.spyOn(mockFlashcardSetRepository, 'findByIds').mockResolvedValue([]);
      jest.spyOn(mockCollectionRepository, 'save').mockResolvedValue({
        ...mockCollection,
        name: updatedDto.name,
        comments: [...mockCollection.comments, { content: updatedDto.comment }],
      } as any);
  
      const result = await service.updateCollectionById(1, updatedDto);
      expect(result.name).toEqual(updatedDto.name);
      expect(result.comments).toContainEqual({ content: updatedDto.comment });
    });
  
    it('should throw NotFoundException if collection does not exist', async () => {
      jest.spyOn(service, 'findCollectionById').mockRejectedValue(new NotFoundException());
      const updatedDto = {
        name: 'Updated Collection',
        sets: [],
        comment: 'Updated comment',
      };
      await expect(service.updateCollectionById(99, updatedDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteCollectionById', () => {
    it('should delete a collection', async () => {
      jest.spyOn(service, 'findCollectionById').mockResolvedValue(mockCollection as any);
      jest.spyOn(mockCollectionRepository, 'delete').mockResolvedValue({ affected: 1 } as any);
      const result = await service.deleteCollectionById(1);
      expect(result).toEqual(mockCollection);
    });

    it('should throw NotFoundException if collection does not exist', async () => {
      jest.spyOn(service, 'findCollectionById').mockRejectedValue(new NotFoundException());
      await expect(service.deleteCollectionById(99)).rejects.toThrow(NotFoundException);
    });
  });
});

