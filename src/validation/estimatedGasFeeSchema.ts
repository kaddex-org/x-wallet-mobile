import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {REQUIRED_MESSAGE} from '../constants';

export const estimatedGasFeeSchema = yupResolver(
  yup.object({
    speed: yup.string(),
    gasLimit: yup.number().required(REQUIRED_MESSAGE),
    gasPrice: yup.number().required(REQUIRED_MESSAGE),
  }),
);
