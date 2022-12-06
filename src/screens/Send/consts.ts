export const chainIds = Array.from({length: 20}, (_, i) => ({
  label: `Chain ${i}`,
  value: `${i}`,
}));

export const predicates = [
  {
    label: 'keys-all',
    value: 'keys-all',
  },
  {
    label: 'keys-any',
    value: 'keys-any',
  },
];
