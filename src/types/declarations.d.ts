declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '@env' {
  export const DEFAULT_API_URL: string;
  export const NAMESPACE: string;
  export const DEV_NETWORK_URL: string;
  export const TEST_NETWORK_URL: string;
  export const MAIN_NETWORK_URL: string;
  export const KADDEX_URL: string;
  export const ENCRYPTION_KEY: string;
}

declare module 'react-native-progress/CircleSnail' {
  import ProgressCircle from 'react-native-progress/CircleSnail';
  export default ProgressCircle;
}
