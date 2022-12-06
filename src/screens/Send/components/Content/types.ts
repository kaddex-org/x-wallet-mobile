import {Dispatch, SetStateAction} from 'react';

export type TContentType = {
  predicate: string | null;
  setPredicate: Dispatch<SetStateAction<string | null>>;
  receiverPublicKey: string | null;
  setReceiverPublicKey: (v: string) => void;
};
