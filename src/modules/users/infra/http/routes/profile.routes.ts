import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '../middleware/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthentication);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      old_password: Joi.string().when(Joi.ref('password'), {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      password_confirmation: Joi.string()
        .when(Joi.ref('password'), {
          is: Joi.exist(),
          then: Joi.required(),
        })
        .valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
