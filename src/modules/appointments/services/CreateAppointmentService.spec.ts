import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/Fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
describe('CreateAppointment', () => {
  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  let createAppointmentService: CreateAppointmentService;

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      user_id: '123',
      provider_id: '123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const date = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date,
      user_id: '123',
      provider_id: '123',
    });

    await expect(
      createAppointmentService.execute({
        date,
        user_id: '123',
        provider_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
