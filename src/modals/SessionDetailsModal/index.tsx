import React, {FC, useCallback, useMemo, useState} from 'react';
import {View, Text, Image, ActivityIndicator, Alert} from 'react-native';
import Modal from '../../components/Modal';
import {TTransactionDetailsModalProps} from './types';
import {styles} from './styles';
import {KDA_NAMESPACE, signClient} from '../../utils/walletConnect';
import ListItem from '../../components/ListItem';
import {truncate} from '../../utils/stringHelpers';
import {MAIN_COLOR} from '../../constants/styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import TrashEmptySvg from '../../assets/images/trash-empty.svg';

const SessionDetailsModal: FC<TTransactionDetailsModalProps> = React.memo(
  ({details, toggle, onDelete, isVisible}) => {
    const [updatedDate] = useState<Date>(new Date());
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const session = useMemo(
      () => signClient?.session.values.find(s => s.topic === details.topic),
      [details],
    );
    const expiryDate = useMemo(
      () => (session ? new Date(session.expiry * 1000) : null),
      [session],
    );

    const onDeleteSession = useCallback(() => {
      ReactNativeHapticFeedback.trigger('impactMedium', {
        enableVibrateFallback: false,
        ignoreAndroidSystemSettings: false,
      });
      Alert.alert(
        'Are you sure to delete this session history?',
        'All data of the session history will be deleted and can not be restored',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              setIsLoading(true);
              if (details.topic) {
                try {
                  await signClient?.disconnect({
                    topic: details.topic,
                    reason: {
                      message: 'User disconnected.',
                      code: 6000,
                    },
                  });
                  toggle();
                  setTimeout(() => onDelete(), 200);
                } catch (e) {
                  Alert.alert(
                    'Failed to delete the session',
                    'WalletConnect config does not match',
                  );
                }
              }
              setIsLoading(false);
            },
          },
        ],
      );
    }, [onDelete, details]);

    const sessionChain = useMemo(() => {
      if (session) {
        let modifiedChains: string[] = [];
        session.namespaces[KDA_NAMESPACE]?.accounts.forEach(account => {
          const [type, chain] = account.split(':');
          const chainId = `${type}:${chain}`;
          modifiedChains.push(chainId);
        });
        modifiedChains = modifiedChains.filter(
          (item, pos, self) =>
            self.findIndex(subItem => subItem === item) === pos,
        );
        return {
          title: `Review ${KDA_NAMESPACE} Permissions`,
          namespace: {
            chains: modifiedChains.map(chainId => {
              const extensionMethods: any[] = [];
              const extensionEvents: any[] = [];
              session.namespaces[KDA_NAMESPACE]?.extension?.map(
                ({accounts, methods, events}) => {
                  accounts.forEach(account => {
                    const [type, chain] = account.split(':');
                    const internalChainId = `${type}:${chain}`;
                    if (modifiedChains.includes(internalChainId)) {
                      extensionMethods.push(...methods);
                      extensionEvents.push(...events);
                    }
                  });
                },
              );
              const allMethods = [
                ...(session.namespaces[KDA_NAMESPACE]?.methods || []),
                ...extensionMethods,
              ];
              const allEvents = [
                ...(session.namespaces[KDA_NAMESPACE]?.events || []),
                ...extensionEvents,
              ];
              return {
                name: chainId,
                events: allEvents,
                methods: allMethods,
              };
            }),
          },
        };
      }
      return null;
    }, [session]);

    if (!session) {
      return null;
    }
    return (
      <Modal
        isVisible={isVisible}
        close={toggle}
        title="Session Details"
        onPressLeftItem={onDeleteSession}
        leftHeaderItem={<TrashEmptySvg />}>
        <View style={styles.content}>
          <View style={styles.itemContainer}>
            {details?.logo ? (
              <View style={styles.iconWrapper}>
                <Image
                  source={{uri: details?.logo}}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            ) : null}
            <View style={styles.center}>
              <Text style={styles.title}>{details?.name}</Text>
              {details?.url ? (
                <Text style={styles.link}>
                  {truncate(
                    details?.url?.split('https://')[1] ?? 'Unknown',
                    23,
                  )}
                </Text>
              ) : null}
            </View>
          </View>
          {sessionChain ? (
            <View style={styles.chainContainer}>
              <Text style={styles.chainTitle}>{sessionChain.title}</Text>
              {sessionChain.namespace.chains.map(chain => (
                <React.Fragment key={`item-${chain.name}`}>
                  <Text style={styles.chainLabel}>{chain.name}</Text>
                  <View style={styles.chainWrapper}>
                    <Text style={styles.chainText}>{'Methods'}</Text>
                    <Text style={styles.chainDescription}>
                      {Array.isArray(chain?.methods) &&
                      chain?.methods?.length > 0
                        ? chain.methods.join(', ')
                        : '-'}
                    </Text>
                  </View>
                  <View style={styles.chainWrapper}>
                    <Text style={styles.chainText}>{'Events'}</Text>
                    <Text style={styles.chainDescription}>
                      {Array.isArray(chain?.events) && chain?.events?.length > 0
                        ? chain.events.join(', ')
                        : '-'}
                    </Text>
                  </View>
                </React.Fragment>
              ))}
            </View>
          ) : null}
        </View>
        <View style={styles.footer}>
          <View style={styles.statusWrapper}>
            <Text style={styles.statusText}>{'Expiry'}</Text>
            <Text style={styles.time}>
              {expiryDate
                ? `${expiryDate.toDateString()} ${expiryDate.toLocaleTimeString()}`
                : '-'}
            </Text>
          </View>
          <View style={styles.updateWrapper}>
            <Text style={styles.statusText}>{'Last Updated'}</Text>
            <Text
              style={
                styles.time
              }>{`${updatedDate.toDateString()} ${updatedDate.toLocaleTimeString()}`}</Text>
          </View>
          <ListItem
            text="Delete session"
            disabled={isLoading}
            onPress={onDeleteSession}
            textStyle={styles.itemRed}
            style={styles.itemStyle}
          />
        </View>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={MAIN_COLOR} />
          </View>
        ) : null}
      </Modal>
    );
  },
);

export default SessionDetailsModal;
