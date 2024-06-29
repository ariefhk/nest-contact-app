import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  UserResponse,
} from 'src/model/user.model';
import { Logger } from 'winston';
import { ValidationService } from 'src/common/validation.service';
import { UserValidation } from './use.validation';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private validationService: ValidationService,
    private prismaService: PrismaService,
  ) {}
  async register(request: RegisterUserRequest): Promise<UserResponse> {
    this.logger.info('Registering new user: ' + JSON.stringify(request));

    const registerUserRequest: RegisterUserRequest =
      this.validationService.validate(UserValidation.REGISTER, request);

    const countUser = await this.prismaService.user.count({
      where: {
        username: registerUserRequest.username,
      },
    });

    if (countUser !== 0) {
      throw new HttpException('Username already exists!', 400);
    }
    registerUserRequest.password = await bcrypt.hash(
      registerUserRequest.password,
      10,
    );

    const user = await this.prismaService.user.create({
      data: registerUserRequest,
    });

    return {
      username: user.username,
      name: user.name,
    };
  }

  async login(request: LoginUserRequest): Promise<UserResponse> {
    this.logger.info('Login user: ' + JSON.stringify(request));
    const loginUserRequest: LoginUserRequest = this.validationService.validate(
      UserValidation.LOGIN,
      request,
    );

    let existedUser = await this.prismaService.user.findUnique({
      where: {
        username: loginUserRequest.username,
      },
    });

    if (!existedUser) {
      throw new HttpException('User not found!', 404);
    }

    const isPasswordMatch = await bcrypt.compare(
      loginUserRequest.password,
      existedUser.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException('Invalid username or password!', 400);
    }

    existedUser = await this.prismaService.user.update({
      where: {
        username: loginUserRequest.username,
      },
      data: {
        token: uuid(),
      },
    });

    return {
      username: existedUser.username,
      name: existedUser.name,
      token: existedUser.token,
    };
  }

  async get(user: User): Promise<UserResponse> {
    this.logger.info('Get user: ' + JSON.stringify(user));
    return {
      username: user.username,
      name: user.name,
    };
  }

  async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
    this.logger.info('Update user: ' + JSON.stringify(request));

    const updateUserRequest: UpdateUserRequest =
      this.validationService.validate(UserValidation.UPDATE, request);

    // placeholder for updating user data
    const updatedUserData = {};

    if (updateUserRequest.name) {
      updatedUserData['name'] = updateUserRequest.name;
    }

    if (updateUserRequest.password) {
      updatedUserData['password'] = await bcrypt.hash(
        updateUserRequest.password,
        10,
      );
    }

    const updatedUser = await this.prismaService.user.update({
      where: {
        username: user.username,
      },
      data: updatedUserData,
    });

    return {
      username: updatedUser.username,
      name: updatedUser.name,
    };
  }

  async logout(user: User): Promise<UserResponse> {
    this.logger.info('logout user: ' + JSON.stringify(user));

    const logoutUser = await this.prismaService.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });

    return {
      username: logoutUser.username,
      name: logoutUser.name,
    };
  }
}
