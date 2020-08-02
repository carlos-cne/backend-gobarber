import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHasProvider: FakeHashProvider;
  let createUser: CreateUserService;
  let authenticateUser: AuthenticateUserService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHasProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHasProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHasProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@exemple.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'jonhdoe@exemple.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'jonhdoe@exemple.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@exemple.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'jonhdoe@exemple.com',
        password: 'wrong password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
