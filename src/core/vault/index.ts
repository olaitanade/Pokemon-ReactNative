import AsyncStorage from '@react-native-async-storage/async-storage';
import keys from './keys';

export async function getRawAsync(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return Promise.resolve(value);
  } catch (error) {
    return Promise.resolve(undefined);
  }
}

export async function getAsync<T>(key: string): Promise<T | undefined> {
  const value = await getRawAsync(key);

  if (!value) {
    return Promise.resolve(undefined);
  }

  try {
    return Promise.resolve(JSON.parse(value) as T);
  } catch (error) {
    return Promise.resolve(undefined);
  }
}

export async function setAsync<T>(key: string, value: T) {
  try {
    const stringified = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringified);
    return Promise.resolve(true);
  } catch (error) {
    return Promise.resolve(false);
  }
}

export async function hasAsync(key: string): Promise<boolean> {
  return Promise.resolve(!!getRawAsync(key));
}

export async function removeAsync(key: string): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key);
    return Promise.resolve(true);
  } catch (error) {
    //logger.logError(error);
    return Promise.resolve(false);
  }
}

export async function removeAllAsync() {
  try {
    await AsyncStorage.clear();
    return Promise.resolve(true);
  } catch (error) {
    //logger.logError(error);
    return Promise.resolve(false);
  }
}

export default {
  getRawAsync,
  getAsync,
  setAsync,
  hasAsync,
  removeAsync,
  removeAllAsync,
  keys,
};
