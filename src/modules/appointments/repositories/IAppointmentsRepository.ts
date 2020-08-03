import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMounthFromProviderDTO from '../dtos/IFindAllInMounthFromProviderDTO';

export interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllinMonthFromProvider(
    data: IFindAllInMounthFromProviderDTO,
  ): Promise<Appointment[]>;
}
