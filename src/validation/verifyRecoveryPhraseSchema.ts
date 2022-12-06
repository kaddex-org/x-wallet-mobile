import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {REQUIRED_MESSAGE} from '../constants';

export const verifyRecoveryPhraseSchema = yupResolver(
  yup
    .object({
      input1: yup.string().required(REQUIRED_MESSAGE),
      input2: yup.string().required(REQUIRED_MESSAGE),
      input3: yup.string().required(REQUIRED_MESSAGE),
      input4: yup.string().required(REQUIRED_MESSAGE),
      input5: yup.string().required(REQUIRED_MESSAGE),
      input6: yup.string().required(REQUIRED_MESSAGE),
      input7: yup.string().required(REQUIRED_MESSAGE),
      input8: yup.string().required(REQUIRED_MESSAGE),
      input9: yup.string().required(REQUIRED_MESSAGE),
      input10: yup.string().required(REQUIRED_MESSAGE),
      input11: yup.string().required(REQUIRED_MESSAGE),
      input12: yup.string().required(REQUIRED_MESSAGE),
    })
    .required(),
);
