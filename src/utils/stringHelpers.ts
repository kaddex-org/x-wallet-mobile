export const cutStr = (str?: string) =>
  !str ? '' : str.length > 13 ? `${str.slice(0, 5)}...${str.slice(-5)}` : str;

export function isPrivateKey(sig?: string) {
  if (!sig) {
    return false;
  }
  if (sig.length === 64) {
    return true;
  }
}

export const getSecretList = (seeds: string) => {
  const list = seeds.split(' ');
  return [
    `${list.shift()} *** ***`,
    '*** *** ***',
    '*** *** ***',
    `*** *** ${list.pop()}`,
  ];
};

export function truncate(value: string, length: number) {
  if (!value) {
    return '';
  }
  if (value?.length <= length) {
    return value;
  }
  const separator = '...';
  const stringLength = length - separator?.length || 0;
  const frontLength = Math.ceil(stringLength / 2);
  const backLength = Math.floor(stringLength / 2);
  return (
    value?.substring(0, frontLength) +
    separator +
    value?.substring(value?.length - backLength)
  );
}

export const decimalIfNeeded = (v: number | string) => {
  return Number(v)
    .toFixed(6)
    .replace(/[.,]000000$/, '');
};

export const decimalI4fNeeded = (v: number | string) => {
  return Number(v)
      .toFixed(4)
      .replace(/[.,]0000$/, '');
};

export const numberWithCommas = (x: number | string) => {
  let parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const formatDate = (date: Date) => {
  return `${date.toDateString()}, ${date.toLocaleTimeString()}`;
};
