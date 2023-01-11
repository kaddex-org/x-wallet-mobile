import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {REQUIRED_MESSAGE} from '../constants';

export const resetAccountPassword = yupResolver(
  yup
    .object({
      currentPassword: yup.string().required(REQUIRED_MESSAGE),
      newPassword: yup
        .string()
        .required(REQUIRED_MESSAGE)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
        ),
      confirmPassword: yup
        .string()
        .required(REQUIRED_MESSAGE)
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
    })
    .required(),
);
