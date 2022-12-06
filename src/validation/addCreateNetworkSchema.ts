import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {REQUIRED_MESSAGE} from '../constants';

export const addCreateNetworkSchema = yupResolver(
  yup
    .object({
      name: yup.string(),
      host: yup.string().required(REQUIRED_MESSAGE),
      explorerUrl: yup.string().required(REQUIRED_MESSAGE),
    })
    .required(),
);
