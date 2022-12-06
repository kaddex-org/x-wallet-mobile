import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {REQUIRED_MESSAGE} from '../constants';

export const addTokenSchema = yupResolver(
  yup
    .object({
      tokenAddress: yup.string().required(REQUIRED_MESSAGE),
      tokenName: yup.string().required(REQUIRED_MESSAGE),
    })
    .required(),
);
