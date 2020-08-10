import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';
import Appointments from '../infra/typeorm/entities/Appointment';

interface Request {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private apppointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: Request): Promise<Appointments[]> {
    const appointments = await this.apppointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    return appointments;
  }
}

export default ListProviderAppointmentsService;
