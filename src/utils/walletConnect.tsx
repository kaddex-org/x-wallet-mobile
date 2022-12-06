import '@walletconnect/react-native-compat';
import React, {useCallback, useEffect, useState} from 'react';
import SignClient from '@walletconnect/sign-client';
import Modal from '../components/Modal';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {makeSelectIsAuthorized} from '../store/auth/selectors';
import {
  MAIN_COLOR,
  MEDIUM_MONTSERRAT,
  REGULAR_MONTSERRAT,
  SEMI_BOLD_MONTSERRAT,
} from '../constants/styles';
import WalletConnectAccountSelector from '../components/WalletConnectAccountSelector';
import {TAccount} from '../store/userWallet/types';
import {formatJsonRpcResult} from '@json-rpc-tools/utils';
import JSONTree from 'react-native-json-tree';
import {getNetwork} from './networkHelpers';
import {getSignRequest} from '../store/transfer/services';
import {makeSelectAccounts} from '../store/userWallet/selectors';
import queryString from 'query-string';
import {EDefaultNetwork} from '../screens/Networks/types';
import {setIsConnectedWalletConnect} from '../store/userWallet';
import {getSavedValue} from './storageHelplers';
import {useShallowEqualSelector} from '../store/utils';
import {setSendResult} from '../store/history';
import WalletConnectHelpModal from '../components/WalletConnectHelpModal';

const JSONTreeTheme = {
  tree: {
    borderRadius: 10,
  },
  base00: MAIN_COLOR,
  base01: '#FFFFFF',
  base02: '#FFFFFF',
  base03: '#FFFFFF',
  base04: '#FFFFFF',
  base05: '#FFFFFF',
  base06: '#FFFFFF',
  base07: '#FFFFFF',
  base08: '#FFFFFF',
  base09: '#FFFFFF',
  base0A: '#FFFFFF',
  base0B: '#FFFFFF',
  base0C: '#FFFFFF',
  base0D: '#FFFFFF',
  base0E: '#FFFFFF',
  base0F: '#FFFFFF',
};

const labelRenderer = (raw: string) => (
  <Text style={styles.jsonLabel}>{raw}</Text>
);
const valueRenderer = (raw: string) => (
  <Text style={styles.jsonText}>{raw}</Text>
);

export let signClient: SignClient;

type createParams = {
  projectId?: string;
  relayUrl?: string;
};

export const defaultWalletConnectParams = {
  name: '3974e0e0f91a102389b8cb3fc1a590a5',
  projectId: '3974e0e0f91a102389b8cb3fc1a590a5',
  relayUrl: 'wss://relay.walletconnect.com',
  metadata: {
    name: 'X-Wallet',
    description: 'X-Wallet by Kaddex',
    url: 'https://xwallet.kaddex.com/',
    icons: ['https://kaddex.com/Kaddex_icon.png'],
  },
};

export const createSignClient = async (params?: createParams) => {
  signClient = await SignClient.init({
    name: params?.projectId || defaultWalletConnectParams.projectId,
    projectId: params?.projectId || defaultWalletConnectParams.projectId,
    relayUrl: params?.relayUrl || defaultWalletConnectParams.relayUrl,
    metadata: defaultWalletConnectParams.metadata,
  });
};

export const KDA_NAMESPACE = 'kadena';

export const KDA_CHAINS = [
  'kadena:mainnet01',
  'kadena:testnet04',
  'kadena:development',
];

const KDA_METHODS = {
  KDA_SIGN: 'kadena_sign',
  KDA_QUICK_SIGN: 'kadena_quicksign',
};

const KDX_METHODS = {
  KDX_SIGN: 'kaddex_sign',
  KDX_SEND_TRANSACTION: 'kaddex_send_transaction',
  KDX_SIGN_TRANSACTION: 'kaddex_sign_transaction',
};

const KDA_EVENTS = {
  KDA_TRANSACTION_UPDATED: 'kadena_transaction_updated',
};

const KDX_EVENTS = {
  ACCOUNT_CHANGED: 'account_changed',
  CHAIN_ID_CHANGED: 'chain_id_changed',
};

export default function WalletConnect() {
  const dispatch = useDispatch();

  const isAuthorized = useSelector(makeSelectIsAuthorized);
  const accountsList = useShallowEqualSelector(makeSelectAccounts);

  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHelpVisible, setHelpIsVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalContentType, setModalContentType] = useState<string | null>('');
  const [modalContentProps, setModalContentProps] = useState<any>({});

  useEffect(() => {
    getSavedValue('walletConnectParams', {}).then(savedParams => {
      createSignClient(savedParams)
        .then(() => setIsInitialized(true))
        .catch(() => setIsInitialized(false));
    });
  }, []);

  const onSessionProposal = useCallback(proposal => {
    if (proposal) {
      setModalTitle('Session Proposal');
      setModalContentProps({
        proposal,
        selectedAccounts: [],
      });
      setModalContentType('session_proposal');
      setIsVisible(true);
    }
  }, []);

  const onSessionRequest = useCallback(async (requestEvent: any) => {
    const {topic, params} = requestEvent;
    const {request} = params;
    const requestSession = signClient?.session.get(topic);

    switch (request.method) {
      case KDA_METHODS.KDA_SIGN:
      case KDA_METHODS.KDA_QUICK_SIGN:
      case KDX_METHODS.KDX_SIGN:
        setModalTitle('Sign');
        setModalContentProps({
          event: requestEvent,
          session: requestSession,
        });
        setModalContentType('session_request');
        setIsVisible(true);
        break;

      case KDX_METHODS.KDX_SEND_TRANSACTION:
      case KDX_METHODS.KDX_SIGN_TRANSACTION:
        setModalTitle('Send / Sign Transaction');
        setModalContentProps({
          event: requestEvent,
          session: requestSession,
        });
        setModalContentType('session_request');
        setIsVisible(true);
        break;

      default:
        break;
    }
  }, []);

  const onSessionEvent = useCallback(async (sessionEvent: any) => {
    try {
      const {params} = sessionEvent;
      const {event} = params;
      switch (event?.name) {
        case KDA_EVENTS.KDA_TRANSACTION_UPDATED:
          {
            const {params: transactionDetail} = event;
            dispatch(
              setSendResult({
                ...transactionDetail,
                coinShortName: '',
                amount: 0,
                requestKey: transactionDetail.reqKey,
                status:
                  transactionDetail?.result?.status === 'success' ||
                  transactionDetail?.result?.error?.message?.includes(
                    'resumePact: pact completed:',
                  )
                    ? 'success'
                    : transactionDetail?.result?.status === 'failure'
                    ? 'failure'
                    : 'pending',
                createdTime: new Date().toISOString(),
                sender: '',
                sourceChainId: '',
                receiver: '',
                targetChainId: '',
              }),
            );
          }
          break;
        default:
          break;
      }
    } catch (e) {}
  }, []);

  const onSessionDelete = useCallback(() => {
    dispatch(setIsConnectedWalletConnect(false));
  }, []);

  useEffect(() => {
    try {
      if (isInitialized && signClient) {
        signClient?.on('session_proposal', onSessionProposal);
        signClient?.on('session_request', onSessionRequest);
        signClient?.on('session_delete', onSessionDelete);
        signClient?.on('session_event', onSessionEvent);
        signClient?.on('pairing_delete', onSessionDelete);
        signClient?.on('pairing_expire', onSessionDelete);
        return () => {
          signClient?.off('session_proposal', onSessionProposal);
          signClient?.off('session_request', onSessionRequest);
          signClient?.off('session_delete', onSessionDelete);
          signClient?.off('session_event', onSessionEvent);
          signClient?.off('pairing_delete', onSessionDelete);
          signClient?.off('pairing_expire', onSessionDelete);
        };
      }
    } catch (e) {}
  }, [isInitialized, onSessionProposal, onSessionRequest, onSessionDelete]);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setModalTitle('');
      setModalContentProps({});
      setModalContentType(null);
    }, 600);
  }, []);

  const closeHelpModal = useCallback(() => {
    setHelpIsVisible(false);
  }, []);

  const onReject = useCallback(async () => {
    try {
      if (modalContentType === 'session_request') {
        const {session, event} = modalContentProps;
        const {id} = event;
        const {topic} = session;

        const response = formatJsonRpcResult(id, {signedCmd: null});
        await signClient?.respond({
          topic,
          response,
        });

        closeModal();
      } else if (modalContentType === 'session_proposal') {
        const {proposal} = modalContentProps;
        const {id} = proposal;

        await signClient?.reject({
          id,
          reason: {
            message: 'User disconnected.',
            code: 6000,
          },
        });

        closeModal();
      }
    } catch (e) {
      setHelpIsVisible(true);
    }
  }, [closeModal, modalContentProps, modalContentType]);

  const onApprove = useCallback(async () => {
    try {
      if (modalContentType === 'session_request') {
        const {session, event} = modalContentProps;
        const {
          id: eventId,
          params: {
            request: {params: cmdValue},
          },
        } = event;
        const {topic} = session;

        const foundAccount = (accountsList || []).find(
          (item: any) =>
            item.accountName === cmdValue?.sender ||
            item.publicKey === cmdValue?.signingPubKey,
        );
        const signResultResponse = await getSignRequest(
          queryString.stringify({
            network: getNetwork(EDefaultNetwork.devnet),
            instance: cmdValue.networkId,
            version: cmdValue.networkVersion || '0.0',
            sourceChainId: cmdValue.chainId || '2',
            cmdValue: JSON.stringify(cmdValue),
            publicKey: foundAccount?.publicKey || '',
            signature: foundAccount?.privateKey || '',
          }),
        );

        const response = formatJsonRpcResult(eventId, {
          signedCmd: signResultResponse.data,
        });
        await signClient?.respond({
          topic,
          response,
        });

        closeModal();
      } else if (modalContentType === 'session_proposal') {
        const {proposal, selectedAccounts} = modalContentProps;
        const {id, params} = proposal;
        const {relays, requiredNamespaces} = params;
        const accounts: string[] = [];
        requiredNamespaces[KDA_NAMESPACE].chains.forEach((chain: string) => {
          selectedAccounts.forEach((acc: TAccount) => {
            accounts.push(`${chain}:${acc.accountName.replace(':', '**')}`);
          });
        });
        const {acknowledged} = await signClient?.approve({
          id,
          relayProtocol: relays[0].protocol,
          namespaces: {
            [KDA_NAMESPACE]: {
              accounts,
              methods: requiredNamespaces[KDA_NAMESPACE].methods,
              events: requiredNamespaces[KDA_NAMESPACE].events,
              extension: [
                {
                  accounts,
                  methods: Object.values(KDX_METHODS),
                  events: Object.values(KDX_EVENTS),
                },
              ],
            },
          },
        });
        await acknowledged();

        setTimeout(() => dispatch(setIsConnectedWalletConnect(true)), 600);

        closeModal();
      }
    } catch (e) {
      setHelpIsVisible(true);
    }
  }, [accountsList, closeModal, modalContentType, modalContentProps]);

  const onSelectAccounts = useCallback(
    accounts => {
      setModalContentProps({
        ...modalContentProps,
        selectedAccounts: accounts,
      });
    },
    [modalContentProps],
  );

  if (!isAuthorized) {
    return null;
  }
  return (
    <Modal isVisible={isVisible} close={closeModal} title={modalTitle || ''}>
      <View style={styles.content}>
        {modalContentType === 'session_proposal' ? (
          <WalletConnectAccountSelector onSelectAccounts={onSelectAccounts} />
        ) : null}
        {modalContentType === 'session_request' ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={styles.jsonScroll}
            contentContainerStyle={styles.jsonContent}>
            <JSONTree
              data={modalContentProps?.event?.params || {}}
              theme={JSONTreeTheme as any}
              invertTheme={false}
              hideRoot={true}
              labelRenderer={labelRenderer as any}
              valueRenderer={valueRenderer as any}
            />
          </ScrollView>
        ) : null}
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onReject} style={styles.redButton}>
            <Text style={styles.buttonText}>{'Reject'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onApprove} style={styles.greenButton}>
            <Text style={styles.buttonText}>{'Approve'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={isHelpVisible}
        close={closeHelpModal}
        contentStyle={styles.helpModalStyle}
        title="WalletConnect Help">
        <WalletConnectHelpModal onConfirm={closeHelpModal} />
      </Modal>
    </Modal>
  );
}

const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  content: {
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  contentWrapper: {
    width: '100%',
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  checkBoxWrapper: {
    marginBottom: 24,
  },
  buttons: {
    width: '100%',
    paddingHorizontal: 20,
  },
  redButton: {
    marginTop: 16,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#FF6058',
    padding: 12,
  },
  greenButton: {
    marginTop: 16,
    width: '100%',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#27CA40',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: MEDIUM_MONTSERRAT,
    fontWeight: '700',
    fontSize: 14,
  },
  jsonScroll: {
    marginTop: 8,
    marginBottom: 8,
    width: '100%',
  },
  jsonContent: {
    paddingHorizontal: 20,
  },
  jsonLabel: {
    fontFamily: SEMI_BOLD_MONTSERRAT,
    fontWeight: '600',
    fontSize: 14,
  },
  jsonText: {
    fontFamily: REGULAR_MONTSERRAT,
    fontWeight: '400',
    fontSize: 14,
  },
  helpModalStyle: {
    minHeight: windowHeight * 0.4 - 48,
  },
});
