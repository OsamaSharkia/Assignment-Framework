import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser: User = {
    id: 1,
    username: 'testuser',
    password: 'hashedpassword',
    flashcardSets: [],
    comments: [],
  };

  const mockCreateUserDto: CreateUserDto = {
    username: 'testuser',
    password: 'password123',
    admin: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockUser);
      const result = await controller.register(mockCreateUserDto);
      expect(result).toEqual({ message: 'User registered successfully', userId: 1 });
      expect(service.create).toHaveBeenCalledWith(mockCreateUserDto);
    });

    it('should throw ConflictException if username already exists', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new ConflictException());
      await expect(controller.register(mockCreateUserDto)).rejects.toThrow(ConflictException);
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new Error());
      await expect(controller.register(mockCreateUserDto)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
