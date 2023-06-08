import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from '../../../app/grupo/role.service';
import TestUtils from '../../../common/test/TestUtils';
import { USER_REPOSITORY } from '../../../config/constants';
import { UserService } from '../user.service';

describe('UserService', () => {
  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
  const mockRoleService = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
  let service: UserService;
  // let app;
  // let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY,
          useValue: mockRepository,
        },
        {
          provide: RoleService,
          useValue: mockRoleService,
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    // app = module.createNestApplication();
    // userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    // await app.init();
  });
  
  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  // afterAll(async () => {
  //   await app.close();
  // });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('shold be list all users', async () => {
      const user = TestUtils.giveAMeAValidUser();
      mockRepository.find.mockReturnValue([user, user]);
      const users = await service.findAll();
      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    })
  })
});
