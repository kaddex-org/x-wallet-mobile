import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {REQUIRED_MESSAGE} from '../constants';

export const walletConnectSchema = yupResolver(
  yup
    .object({
      projectId: yup.string().required(REQUIRED_MESSAGE),
      relayUrl: yup.string().required(REQUIRED_MESSAGE),
    })
    .required(),
);
