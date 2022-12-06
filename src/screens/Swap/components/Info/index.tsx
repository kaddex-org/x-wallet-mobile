import React, {FC, useCallback, useMemo} from 'react';
import {View, Text} from 'react-native';
import {usePactContext} from '../../../../contexts';
import {getDecimalPlaces, reduceBalance} from '../../../../utils/numberHelpers';
import {styles} from './styles';
import {TInfoProps} from './types';
import {commonColors} from '../../../../constants/styles';

const Info: FC<TInfoProps> = ({
  withMoreInfo,
  firstToken,
  secondToken,
  priceImpact,
}) => {
  const pact = usePactContext();

  const getPriceImpactColor = useCallback(() => {
    if (pact.priceImpactWithoutFee(priceImpact)) {
      const priceImpactPercentage = +reduceBalance(
        pact.priceImpactWithoutFee(priceImpact) * 100,
        4,
      );
      if (priceImpactPercentage < 1) {
        return commonColors.green;
      } else if (priceImpactPercentage >= 1 && priceImpactPercentage < 5) {
        return commonColors.yellow;
      } else if (priceImpactPercentage >= 5) {
        return commonColors.red;
      }
    }
  }, [priceImpact, pact.priceImpactWithoutFee]);

  const items = useMemo(
    () => [
      {
        id: 1,
        title: 'Gas Cost',
        value: 'FREE',
        textColor: 'rgb(65, 204, 65)',
        hide: !pact.enableGasStation,
      },
      {
        id: 2,
        title: 'Price Impact',
        value:
          pact.priceImpactWithoutFee(priceImpact) < 0.0001 &&
          pact.priceImpactWithoutFee(priceImpact)
            ? '< 0.01 %'
            : `${reduceBalance(
                pact.priceImpactWithoutFee(priceImpact) * 100,
                4,
              )} %`,
        textColor: getPriceImpactColor(),
      },
      {
        id: 3,
        title: 'Price',
        value: `${reduceBalance(pact.ratio * (1 + Number(priceImpact)))} ${
          firstToken.coin + ' / ' + secondToken.coin
        } `,
      },
      {
        id: 4,
        title: 'Max Slippage',
        value: `${pact.slippage * 100} %`,
      },
      {
        id: 5,
        title: 'Liquidity Provider Fee',
        value: `${getDecimalPlaces(0.003 * parseFloat(firstToken.amount))} ${
          firstToken.coin
        }`,
      },
      ...(withMoreInfo
        ? [
            {
              id: 6,
              title: 'Transaction Deadline',
              value: `${pact.ttl > 60 ? pact.ttl / 60 : pact.ttl} ${
                pact.ttl > 60 ? 'minutes' : 'seconds'
              }`,
            },
            {
              id: 7,
              title: 'Gas Price',
              value: `${pact.gasConfiguration.gasPrice}`,
            },
            {
              id: 8,
              title: 'Gas Limit',
              value: `${pact.gasConfiguration.gasLimit}`,
            },
          ]
        : []),
    ],
    [
      pact.gasConfiguration,
      pact.ttl,
      pact.slippage,
      pact.priceImpactWithoutFee,
      pact.enableGasStation,
      pact.ratio,
      withMoreInfo,
      firstToken,
      secondToken,
      priceImpact,
      getPriceImpactColor,
    ],
  );

  if (firstToken.amount === '') {
    return null;
  }
  return (
    <View style={styles.container}>
      {items.map(
        ({title, textColor, value, id, hide}) =>
          !hide && (
            <View style={styles.item} key={id}>
              <Text style={{...styles.title, color: textColor || 'black'}}>
                {`${title}:`}
              </Text>
              <Text style={{...styles.text, color: textColor || 'black'}}>
                {value}
              </Text>
            </View>
          ),
      )}
    </View>
  );
};

export default Info;
