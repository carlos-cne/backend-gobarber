import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

describe('CreateUser', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  let createUserService: CreateUserService;
  let fakeCacheProvider: FakeCacheProvider;
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      email: 'teste@123.com',
      name: 'unit test',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('teste@123.com');
  });

  it('should not be able to create a new user the same email', async () => {
    await createUserService.execute({
      email: 'teste@123.com',
      name: 'unit test',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        email: 'teste@123.com',
        name: 'unit test',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
