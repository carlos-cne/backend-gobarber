import { inject, injectable } from 'tsyringe';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';
import Appointments from '../infra/typeorm/entities/Appointment';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: Request): Promise<Appointments[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;
    let appointments = await this.cacheProvider.recover<Appointments[]>(
      cacheKey,
    );

    if (!appointments) {
      appointments = await this.apppointmentsRepository.findAllInDayFromProvider(
        {
          provider_id,
          day,
          month,
          year,
        },
      );

      await this.cacheProvider.save(cacheKey, classToClass(appointments));
    }

    return appointments;
  }
}

export default ListProviderAppointmentsService;
