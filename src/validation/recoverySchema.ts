import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {REQUIRED_MESSAGE} from '../constants';

export const recoverySchema = yupResolver(
  yup
    .object({
      seeds: yup.string().required(REQUIRED_MESSAGE),
      password: yup
        .string()
        .min(8, 'password must contain at least 8 chars')
        .required(REQUIRED_MESSAGE),
      confirmPassword: yup
        .string()
        .required(REQUIRED_MESSAGE)
        .test('passwordMatch', 'Password does not match', function (value) {
          return value === this.parent.password;
        }),
    })
    .required(),
);
