import {useContext} from 'react';
import {PactContext} from './Pact';

export function usePactContext() {
  return useContext(PactContext);
}
