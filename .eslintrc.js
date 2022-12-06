module.exports = {
  plugins: ['unused-imports'],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'prettier',
    'prettier/react',
    'eslint:recommended',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array
    '@react-native-community',
  ],
  parserOptions: {
    ecmaVersion: 2016, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    '@typescript-eslint/no-use-before-define': 0,
    'prefer-template': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/prop-types': 0,
    'react/state-in-constructor': [2, 'never'],
    'react/no-array-index-key': 0,
    'react/no-did-update-set-state': 0,
    'import/prefer-default-export': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-curly-brace-presence': 0,
    'import/no-unresolved': 0,
    'import/no-cycle': 0,
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  root: true,
};
