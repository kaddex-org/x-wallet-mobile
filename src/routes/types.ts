import type {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum ERootStackRoutes {
  Home = 'Home',
  NoConnection = 'NoConnection',
  Networks = 'Networks',
  WalletConnectSettings = 'WalletConnectSettings',
  Welcome = 'Welcome',
  Registration = 'Registration',
  RecoveryFromSeeds = 'RecoveryFromSeeds',
  SignIn = 'SignIn',
  SecretRecoveryPhraseTerm = 'SecretRecoveryPhraseTerm',
  SecretRecoveryPhrase = 'SecretRecoveryPhrase',
  VerifyRecoveryPhrase = 'VerifyRecoveryPhrase',
  Login = 'Login',
  ResetPasscode = 'ResetPasscode',
  Send = 'Send',
  Receive = 'Receive',
  SendSummary = 'SendSummary',
  SearchTokens = 'SearchTokens',
  SendProgress = 'SendProgress',
  Contacts = 'Contacts',
  AddEditContact = 'AddEditContact',
  AddEditNetwork = 'AddEditNetwork',
  AddToken = 'AddToken',
  ImportAccount = 'ImportAccount',
  RecoverAccount = 'RecoverAccount',
  ExportRecoveryPhraseAuth = 'ExportRecoveryPhraseAuth',
  ExportRecoveryPhrase = 'ExportRecoveryPhrase',
  WalletConnectScan = 'WalletConnectScan',
  ReceiverScan = 'ReceiverScan',
  ChangeAccountPassword = 'ChangeAccountPassword',
  SettingsSubPage = 'SettingsSubPage',
  Add2FA = 'Add2FA',
}

export enum EHomeTabRoutes {
  Wallet = 'Wallet',
  History = 'History',
  Connection = 'Connection',
  Nft = 'Nft',
  Settings = 'Settings',
  Swap = 'Swap',
}

export type THomeTabParamList = {
  [EHomeTabRoutes.Wallet]: undefined;
  [EHomeTabRoutes.History]: undefined;
  [EHomeTabRoutes.Nft]: undefined;
  [EHomeTabRoutes.Settings]: undefined;
  [EHomeTabRoutes.Connection]: undefined;
};

export type TRootStackParamList = {
  [ERootStackRoutes.Home]: NavigatorScreenParams<THomeTabParamList>;
  [ERootStackRoutes.NoConnection]: undefined;
  [ERootStackRoutes.Networks]: undefined;
  [ERootStackRoutes.WalletConnectSettings]: undefined;
  [ERootStackRoutes.Welcome]: undefined;
  [ERootStackRoutes.Registration]: undefined;
  [ERootStackRoutes.RecoveryFromSeeds]: undefined;
  [ERootStackRoutes.SignIn]: undefined;
  [ERootStackRoutes.SecretRecoveryPhraseTerm]: undefined;
  [ERootStackRoutes.SecretRecoveryPhrase]: undefined;
  [ERootStackRoutes.VerifyRecoveryPhrase]: undefined;
  [ERootStackRoutes.Login]: {isReset?: boolean};
  [ERootStackRoutes.ResetPasscode]: {isReset?: boolean};
  [ERootStackRoutes.Send]: {sourceChainId?: string};
  [ERootStackRoutes.Receive]: undefined;
  [ERootStackRoutes.SendSummary]: undefined;
  [ERootStackRoutes.SendProgress]: undefined;
  [ERootStackRoutes.SearchTokens]: undefined;
  [ERootStackRoutes.Contacts]: undefined;
  [ERootStackRoutes.AddEditContact]: {isCreate?: boolean};
  [ERootStackRoutes.AddEditNetwork]: {isCreate?: boolean};
  [ERootStackRoutes.AddToken]: {tokenName?: string};
  [ERootStackRoutes.ImportAccount]: undefined;
  [ERootStackRoutes.RecoverAccount]: undefined;
  [ERootStackRoutes.ExportRecoveryPhraseAuth]: undefined;
  [ERootStackRoutes.ExportRecoveryPhrase]: undefined;
  [ERootStackRoutes.WalletConnectScan]: undefined;
  [ERootStackRoutes.ReceiverScan]: {onScan: (v: string) => void};
  [ERootStackRoutes.SettingsSubPage]: undefined;
  [ERootStackRoutes.ChangeAccountPassword]: undefined;
  [ERootStackRoutes.Add2FA]: undefined;
};

export type TNavigationProp<RouteName extends keyof TRootStackParamList> =
  NativeStackNavigationProp<TRootStackParamList, RouteName>;

export type TNavigationRouteProp<RouteName extends keyof TRootStackParamList> =
  RouteProp<TRootStackParamList, RouteName>;
