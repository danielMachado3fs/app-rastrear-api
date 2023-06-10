import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "src/app/usuario/user.service";
import TestUtils from "src/common/test/TestUtils";
import { AuthService } from "../auth.service";

describe('AuthService', () => {
  let service: AuthService;
  const mockUserService = {
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        }
      ]
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  describe('authenticate', () => {
    it('should authenticate user', () => {
      const credentials = TestUtils.giveAMeAValidLogin;
      const user = TestUtils.giveAMeAValidUser;
      mockUserService.findOne.mockReturnValue(user);
      const result = await service.authenticate(credentials);
      
    })
  })
})