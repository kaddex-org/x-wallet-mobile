import {TDefaultRequestState} from '../types';

export type TAuthState = {
  password: string | null;
  pinCode: string | null;
  isAuthorized: boolean;
  newPinCode: string | null;
  generatedPhrasesState: TDefaultRequestState<string[]>;
  is2FaAdded: boolean;
};
