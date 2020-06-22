import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeAppointmentsRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      email: 'teste@123.com',
      name: 'unit test',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('teste@123.com');
  });

  it('should not be able to create a new user the same email', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(
      fakeAppointmentsRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      email: 'teste@123.com',
      name: 'unit test',
      password: '123456',
    });

    expect(
      createUserService.execute({
        email: 'teste@123.com',
        name: 'unit test',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
