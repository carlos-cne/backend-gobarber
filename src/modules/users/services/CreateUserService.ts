import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepositories';

interface Request {
  name: string;
  email: string;
  password: string;
}

injectable();
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUsersExists = await this.usersRepository.findByEmail(email);

    if (checkUsersExists) {
      throw new AppError('Email already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
