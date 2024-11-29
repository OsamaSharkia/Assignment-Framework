import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { CollectionDto } from './dto/collection.dto';
import { NotFoundException } from '@nestjs/common';

describe('CollectionsController', () => {
  let controller: CollectionsController;
  let service: CollectionsService;

  const mockCollection = {
    id: 1,
    name: 'Test Collection',
    sets: [],
    comments: [],
  };

  const mockCollectionsService = {
    findAllCollections: jest.fn().mockResolvedValue([mockCollection]),
    findCollectionById: jest.fn().mockResolvedValue(mockCollection),
    createCollection: jest.fn().mockResolvedValue(mockCollection),
    updateCollectionById: jest.fn().mockResolvedValue(mockCollection),
    deleteCollectionById: jest.fn().mockResolvedValue(mockCollection),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionsController],
      providers: [
        {
          provide: CollectionsService,
          useValue: mockCollectionsService,
        },
      ],
    }).compile();

    controller = module.get<CollectionsController>(CollectionsController);
    service = module.get<CollectionsService>(CollectionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('deleteCollectionById', () => {
    it('should delete a collection', async () => {
      const result = await controller.deleteCollectionById(1);
      expect(result).toEqual(mockCollection);
      expect(service.deleteCollectionById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if collection does not exist', async () => {
      jest.spyOn(service, 'deleteCollectionById').mockRejectedValue(new NotFoundException());
      await expect(controller.deleteCollectionById(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAllCollections', () => {
    it('should return an array of collections', async () => {
      const result = await controller.findAllCollections();
      expect(result).toEqual([mockCollection]);
      expect(service.findAllCollections).toHaveBeenCalled();
    });
  });

  describe('findCollectionById', () => {
    it('should return a single collection', async () => {
      const result = await controller.findCollectionById(1);
      expect(result).toEqual(mockCollection);
      expect(service.findCollectionById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if collection does not exist', async () => {
      jest.spyOn(service, 'findCollectionById').mockRejectedValue(new NotFoundException());
      await expect(controller.findCollectionById(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createCollection', () => {
    it('should create a collection', async () => {
      const dto: CollectionDto = {
        name: 'New Collection',
        sets: [],
        comment: 'Test comment',
      };
      const result = await controller.createCollection(dto);
      expect(result).toEqual(mockCollection);
      expect(service.createCollection).toHaveBeenCalledWith(dto);
    });
  });

  describe('updateCollectionById', () => {
    it('should update a collection', async () => {
      const dto: CollectionDto = {
        name: 'Updated Collection',
        sets: [],
        comment: 'Updated comment',
      };
      const result = await controller.updateCollectionById(1, dto);
      expect(result).toEqual(mockCollection);
      expect(service.updateCollectionById).toHaveBeenCalledWith(1, dto);
    });
  });
});
