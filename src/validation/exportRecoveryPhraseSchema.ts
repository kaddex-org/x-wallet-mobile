import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {REQUIRED_MESSAGE} from '../constants';

export const exportRecoveryPhraseSchema = yupResolver(
  yup
    .object({
      password: yup.string().required(REQUIRED_MESSAGE),
    })
    .required(),
);
