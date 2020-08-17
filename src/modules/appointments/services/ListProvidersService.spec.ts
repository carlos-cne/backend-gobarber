import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

describe('ListProviders', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let listProviders: ListProvidersService;
  let fakeCacheProvider: FakeCacheProvider;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all the Providers', async () => {
    const foo = await fakeUsersRepository.create({
      email: 'foo@test.com',
      name: 'foo',
      password: '123456',
    });

    const bar = await fakeUsersRepository.create({
      email: 'bar@test.com',
      name: 'bar',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      email: 'baz@test.com',
      name: 'baz',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([foo, bar]);
  });
});
