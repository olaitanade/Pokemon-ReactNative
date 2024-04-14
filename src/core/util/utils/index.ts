import {Platform} from 'react-native';
import {useRef} from 'react';
import Config from 'react-native-config';

export const BASE_URL = Config.BASE_URL;

export function exponentialBackoff(retryNumber = 0): number {
  const delay = Math.pow(2, retryNumber) * 100;
  const randomSum = delay * 0.2 * Math.random();
  return delay + randomSum;
}

export function sleep(timeInMs: number = 0) {
  return new Promise(resolve => setTimeout(resolve, timeInMs));
}

export function notNil<T>(value?: T | null): value is T {
  return typeof value !== 'undefined' && value !== null;
}

export function getRandomInt(min, max): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function nil<T>(value?: T | null): value is undefined | null {
  return !notNil(value);
}

export function isIndex(value: number) {
  return !!~value;
}

export function rateLimit(fn: Fn, times = 1, delta = Infinity) {
  let n = 0;
  let lastRecordedTime: number;
  let cachedReturnValue: ReturnType<Fn>;

  return (...args: any[]) => {
    const currentTime = new Date().getTime();
    lastRecordedTime = lastRecordedTime ?? currentTime;
    n += 1;

    if (currentTime > lastRecordedTime + delta) {
      // reset if allowed delta passed since last recorded time
      n = 1;
      lastRecordedTime = currentTime;
      cachedReturnValue = fn(...args);
      return cachedReturnValue;
    }

    if (n > times) {
      return cachedReturnValue;
    }

    cachedReturnValue = fn(...args);
    return cachedReturnValue;
  };
}

const BOUNCE_RATE = 2000;

export const useDebounce = () => {
  const busy = useRef(false);

  const debounce = async (callback: Function) => {
    setTimeout(() => {
      busy.current = false;
    }, BOUNCE_RATE);

    if (!busy.current) {
      busy.current = true;
      callback();
    }
  };

  return {debounce};
};

export function getByPlatform<T>({ios, android}: {ios?: T; android?: T}): T {
  return Platform.select({ios, android})!;
}

export default {
  exponentialBackoff,
  sleep,
  nil,
  notNil,
  isIndex,
  rateLimit,
};
