import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/Fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('Update User Avatar', () => {
  let fakeStorageProvider: FakeStorageProvider;
  let fakeUsersRepository: FakeUsersRepository;
  let updateUserAvatarService: UpdateUserAvatarService;

  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update avatar', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@123.com',
      name: 'unit test',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'unit-test.jpg',
    });

    expect(user.avatar).toBe('unit-test.jpg');
  });

  it('should not be able to update avatar without an existent user', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: 'without-existent-id',
        avatarFilename: 'unit-test.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when update new avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user = await fakeUsersRepository.create({
      email: 'teste@123.com',
      name: 'unit test',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'unit-test.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'unit-test2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('unit-test.jpg');
    expect(user.avatar).toBe('unit-test2.jpg');
  });
});
