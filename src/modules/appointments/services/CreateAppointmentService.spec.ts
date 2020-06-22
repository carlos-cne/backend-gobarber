import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/Fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const date = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date,
      provider_id: '123',
    });

    expect(
      createAppointmentService.execute({
        date,
        provider_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
