import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {REQUIRED_MESSAGE} from '../constants';

export const importAccountSchema = yupResolver(
  yup
    .object({
      accountName: yup.string().required(REQUIRED_MESSAGE),
      chainId: yup.string().required(REQUIRED_MESSAGE),
      privateKey: yup.string().required(REQUIRED_MESSAGE),
    })
    .required(),
);
