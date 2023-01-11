import {useCallback, useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';
import {ENCRYPTION_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const valueStorage = new MMKV({id: 'app-value-storage'});
const plainStorage = new MMKV();
const userStorage = new MMKV({
  id: 'user-storage',
  encryptionKey: ENCRYPTION_KEY,
});
const authStorage = new MMKV({
  id: 'auth-storage',
  encryptionKey: ENCRYPTION_KEY,
});

export const removeAllPersistData = async () => {
  valueStorage.clearAll();
  plainStorage.clearAll();
  userStorage.clearAll();
  authStorage.clearAll();
  await AsyncStorage.clear();
};

export function useAsyncStorage(key: string, initialValue?: any) {
  const [storedValue, setStoredValue] = useState<any>(initialValue || null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getStoredItem = useCallback(
    async (keyParam: string, initialValueParam?: any) => {
      try {
        const item = await valueStorage.getString(keyParam);
        const value = item ? JSON.parse(item) : initialValueParam || null;
        setStoredValue(value);
      } catch (error) {}
    },
    [],
  );

  useEffect(() => {
    setIsLoading(true);
    getStoredItem(key, initialValue).finally(() => setIsLoading(false));
  }, [key, initialValue]);

  const setValue = useCallback(
    async (value: any) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        await valueStorage.set(key, JSON.stringify(valueToStore));
      } catch (error) {}
    },
    [key],
  );

  return [storedValue, setValue, isLoading];
}

export const getSavedValue = async (
  keyParam: string,
  initialValueParam?: any,
) => {
  try {
    const item = await valueStorage.getString(keyParam);
    return item ? JSON.parse(item) : initialValueParam || null;
  } catch (error) {
    return initialValueParam || null;
  }
};

export const saveValue = async (key: string, value?: any) => {
  try {
    await valueStorage.set(key, JSON.stringify(value));
  } catch (error) {}
};
