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
      password: Joi.string().allow('').min(6),
      old_password: Joi.string().when(Joi.ref('password'), {
        is: Joi.string().not(''),
        then: Joi.required(),
        otherwise: Joi.string().allow('').optional(),
      }),
      password_confirmation: Joi.string()
        .when(Joi.ref('password'), {
          is: Joi.exist(),
          then: Joi.required(),
          otherwise: Joi.string().allow(''),
        })
        .valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
