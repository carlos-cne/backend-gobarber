import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/http/middleware/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailability';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailability';

const providersRouter = Router();

const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRouter.use(ensureAuthentication);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);

export default providersRouter;
