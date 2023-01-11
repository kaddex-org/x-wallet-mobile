import {
  DEFAULT_API_URL,
  NAMESPACE,
  DEV_NETWORK_URL,
  TEST_NETWORK_URL,
  MAIN_NETWORK_URL,
  KADDEX_URL,
} from '@env';

export const DEV_NETWORK_API_URL = DEV_NETWORK_URL;
export const TEST_NETWORK_API_URL = TEST_NETWORK_URL;
export const MAIN_NETWORK_API_URL = MAIN_NETWORK_URL;
export const SERVER_REMOTE_URL = DEFAULT_API_URL;
export const KADDEX_NAMESPACE = NAMESPACE;
export const KADDEX_API_URL = KADDEX_URL;

export const defaultHeader = {
  Accept: '*/*',
};

export const blockJsonHeader = {
  Accept: 'application/json;blockheader-encoding=object',
};

export const jsonHeader = {
  Accept: 'application/json',
};

export const contentHeader = {
  'Content-Type': 'application/json',
};

export const defaultChainIds = Array.from({length: 20}, (_, i) => `${i}`);

export const nonTransferableTokens = ['kaddex.skdx'];
