import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../modules/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../core/models/User';

describe('UsersService', () => {
  let service: UserService;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      findOneBy: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
