import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHasProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeAppointmentsRepository,
      fakeHasProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeAppointmentsRepository,
      fakeHasProvider,
    );

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
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHasProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeAppointmentsRepository,
      fakeHasProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'jonhdoe@exemple.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

it('should not be able to authenticate with wrong password', async () => {
  const fakeAppointmentsRepository = new FakeUsersRepository();
  const fakeHasProvider = new FakeHashProvider();
  const createUser = new CreateUserService(
    fakeAppointmentsRepository,
    fakeHasProvider,
  );
  const authenticateUser = new AuthenticateUserService(
    fakeAppointmentsRepository,
    fakeHasProvider,
  );

  await createUser.execute({
    name: 'Jonh Doe',
    email: 'jonhdoe@exemple.com',
    password: '123456',
  });

  expect(
    authenticateUser.execute({
      email: 'jonhdoe@exemple.com',
      password: 'wrong password',
    }),
  ).rejects.toBeInstanceOf(AppError);
});
