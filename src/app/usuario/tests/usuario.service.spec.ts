import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtils from '../../../common/test/TestUtils';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

describe('UserService', () => {
  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find all users', () => {
    it('shold be list all users', async () => {
      const user = TestUtils.giveAMeAValidUser();
      mockRepository.find.mockReturnValue([user, user, user]);
      const users = await service.findAll();
      expect(users).toHaveLength(2);
      expect(mockRepository.find).toBeCalled();
      expect(mockRepository.find).toBeCalledTimes(2);
    })
  })
});
