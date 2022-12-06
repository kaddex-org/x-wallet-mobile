import React, {useMemo} from 'react';
import {View} from 'react-native';
import ContentHeader from './components/ContentHeader';
import {styles} from './styles';
import ListItem from './components/ListItem';
import {makeSelectSelectedAccount} from '../../../../store/userWallet/selectors';
import {TWallet} from '../../../../store/userWallet/types';
import {useShallowEqualSelector} from '../../../../store/utils';

const AssetsList = React.memo(() => {
  const selectedAccount = useShallowEqualSelector(makeSelectSelectedAccount);
  const walletList = useMemo(
    () => selectedAccount?.wallets || [],
    [selectedAccount],
  );
  return (
    <View style={styles.wrapper}>
      <ContentHeader />
      <View style={styles.listWrapper}>
        {walletList.map((walletItem: TWallet, listIndex: number) => (
          <ListItem
            key={walletItem.tokenAddress}
            isFirst={listIndex === 0}
            walletItem={walletItem}
          />
        ))}
      </View>
    </View>
  );
});

export default AssetsList;
