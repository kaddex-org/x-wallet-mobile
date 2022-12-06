export const GET_GENERATE_PASSWORDS = 'GET_GENERATE_PASSWORDS';
export const LOGOUT = 'LOGOUT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';

export const getGeneratePasswords = () => ({
  type: GET_GENERATE_PASSWORDS,
});

export const logout = () => ({
  type: LOGOUT,
});

export const deleteAccount = () => ({
  type: DELETE_ACCOUNT,
});
