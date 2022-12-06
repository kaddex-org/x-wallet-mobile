import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {REQUIRED_MESSAGE} from '../constants';

export const addCreateContactSchema = yupResolver(
  yup
    .object({
      contactName: yup.string().required(REQUIRED_MESSAGE),
      accountName: yup.string().required(REQUIRED_MESSAGE),
      chainId: yup.string().required(REQUIRED_MESSAGE),
    })
    .required(),
);
