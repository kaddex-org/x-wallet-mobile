import {shallowEqual, useSelector} from 'react-redux';

export const useShallowEqualSelector: (
  selector: (state: any) => any,
) => any = selector => {
  return useSelector(selector, shallowEqual);
};
