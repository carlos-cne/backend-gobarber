import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

describe('UpdateProfileService', () => {
  let fakeHashProvider: FakeHashProvider;
  let fakeUsersRepository: FakeUsersRepository;
  let updateProfile: UpdateProfileService;

  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@123.com',
      name: 'unit test',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jonh Doe',
      email: 'jonhdoe@exemple.com',
    });

    expect(updatedUser.name).toBe('Jonh Doe');
    expect(updatedUser.email).toBe('jonhdoe@exemple.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing user',
        name: 'Test',
        email: 'test@exemple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email in case of email already exists', async () => {
    await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@exemple.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      email: 'teste@123.com',
      name: 'unit test',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jonh Doe',
        email: 'jonhdoe@exemple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@123.com',
      name: 'unit test',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jonh Doe',
      email: 'jonhdoe@exemple.com',
      password: '123123',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@123.com',
      name: 'unit test',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jonh Doe',
        email: 'jonhdoe@exemple.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password if the old password is different from the current one', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@123.com',
      name: 'unit test',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jonh Doe',
        email: 'jonhdoe@exemple.com',
        password: '123123',
        old_password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
