import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {REQUIRED_MESSAGE} from '../constants';

export const recoverAccountSchema = yupResolver(
  yup
    .object({
      seeds: yup.string().required(REQUIRED_MESSAGE),
      accountIndex: yup.number(),
    })
    .required(),
);
