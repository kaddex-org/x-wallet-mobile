import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {REQUIRED_MESSAGE} from '../constants';

export const createPasswordSchema = yupResolver(
  yup
    .object({
      password: yup
        .string()
        .required(REQUIRED_MESSAGE)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
        ),
      confirmPassword: yup
        .string()
        .required(REQUIRED_MESSAGE)
        .test('passwordMatch', 'Password does not match', function (value) {
          return value === this.parent.password;
        }),
    })
    .required(),
);
