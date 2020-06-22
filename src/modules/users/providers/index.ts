import { container } from 'tsyringe';
import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCriptyHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
