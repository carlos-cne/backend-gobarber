import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

describe('SendForgotPasswordEmailService', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeAppointmentsRepository,
      fakeMailProvider,
    );

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeAppointmentsRepository.create({
      name: 'Jonh Doe',
      email: 'teste@123.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'teste@123.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeAppointmentsRepository,
      fakeMailProvider,
    );

    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'teste@123.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
