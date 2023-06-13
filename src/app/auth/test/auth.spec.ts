import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { User } from "../../../app/usuario/entities/user.entity";
import { UserService } from "../../../app/usuario/user.service";
import TestUtils from '../../../common/test/TestUtils';
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
    it('should authenticate user', async () => {
      const credentials = TestUtils.giveAMeAValidLogin();
      const user = TestUtils.giveAMeAValidUser();
      mockUserService.findOne.mockReturnValue(user);
      const result = await service.authenticate(credentials);
      expect(result).toBeInstanceOf(User);
      expect(result.email).toEqual(credentials.email);
    })

    it('should not authenticate user', async () => {
      const credentials = TestUtils.giveAMeAInvalidLogin();
      const user = TestUtils.giveAMeAValidUser();
      mockUserService.findOne.mockReturnValue(user);
      await expect(service.authenticate(credentials)).rejects.toThrowError(
        new BadRequestException('Usuário ou senha incorretos')
        );
    })
  })
})