import BigNumber from 'bignumber.js';

export const bigNumberConverter = (value: any, decimalPlaces = 2) => {
  return BigNumber(value).decimalPlaces(decimalPlaces).toNumber();
};

export const reduceBalance = (balance: any, precision = 6): string => {
  if (balance) {
    if (balance.int) {
      balance = balance.int;
    }
    if (balance.decimal) {
      balance = balance.decimal;
    }
    if (parseFloat(balance) % 1 === 0) {
      return parseInt(balance).toString();
    }
    return (
      Math.trunc(parseFloat(balance) * Math.pow(10, precision)) /
      Math.pow(10, precision)
    ).toString();
  }
  if (balance === 0) {
    return '0';
  }
  return '0';
};

export const getTokenUsdPriceByLiquidity = (
  liquidity0: number | string,
  liquidity1: number | string,
  usdPrice: number,
  precision?: number,
) => {
  const liquidityRatio = BigNumber(liquidity0, 10)
    .dividedBy(BigNumber(liquidity1, 10))
    .toNumber();
  return bigNumberConverter(liquidityRatio * usdPrice, precision || 8);
};

export const extractDecimal = (num: any) => {
  if (num?.int) {
    return Number(num.int);
  }
  if (num?.decimal) {
    return Number(num.decimal);
  } else {
    return Number(num);
  }
};

export const humanReadableNumber = (num: number, toFixed = 2) =>
  extractDecimal(num)
    ?.toFixed(toFixed)
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? '';

export const countDecimals = (value: number) => {
  if (Math.floor(value) === value) {
    return 0;
  }
  return value?.toString().split('.')[1]?.length || 0;
};

export const getDecimalPositions = (value: string) => {
  const myValue = Number(value);
  const count = countDecimals(myValue);
  if (count < 2) {
    return myValue?.toFixed(2);
  } else if (count > 7) {
    if (countDecimals(+myValue?.toFixed(7)) === 0) {
      var newValue = +myValue?.toFixed(7);
      return newValue?.toFixed(2);
    } else {
      return myValue?.toFixed(7);
    }
  } else {
    if (countDecimals(myValue) === 0) {
      return myValue?.toFixed(2);
    } else {
      return myValue;
    }
  }
};

export const getDecimalPlaces = (value: number) => {
  if (value < 100) {
    return getDecimalPositions(value.toFixed(7));
  } else if (value >= 100 && value < 1000) {
    return getDecimalPositions(value.toFixed(5));
  } else {
    return humanReadableNumber(value);
  }
};

export const limitDecimalPlaces = (numStr: string, count: number) => {
  if (numStr.indexOf('.') === -1) {
    if (numStr === '') {
      return '';
    }
    if (!isNaN(Number(numStr))) {
      return Number(numStr);
    }
  }
  if (
    numStr.indexOf('.') === numStr.length - 1 &&
    !isNaN(Number(numStr.slice(0, numStr.length - 1)))
  ) {
    return numStr;
  }
  if (numStr.length - numStr.indexOf('.') > count && count !== 0) {
    numStr = parseFloat(numStr).toFixed(count);
    return numStr;
  } else {
    return numStr;
  }
};

export function toFixed(num: any, fixed: number) {
  const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}

export const convertDecimal = (decimal: number | string) => {
  decimal = decimal.toString();
  if (decimal.includes('.')) {
    return decimal;
  }
  if (Number(decimal) / Math.floor(Number(decimal)) === 1) {
    decimal += '.0';
  }
  return decimal;
};
