import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../modules/users/users.controller';
import { IUserService } from '../modules/users/users.service.interface';

describe('UsersController', () => {
  let controller: UserController;
  let mockUserService: Partial<IUserService>;

  beforeEach(async () => {
    mockUserService = {
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: 'IUserService',
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
