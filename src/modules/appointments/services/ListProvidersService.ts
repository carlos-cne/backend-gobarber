import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import IUserRepository from '@modules/users/repositories/IUsersRepositories';

interface Request {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    const user = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    return user;
  }
}

export default ListProvidersService;
