import {Platform} from 'react-native';
import {useRef} from 'react';
import config from 'core/config';

export function sleep(timeInMs: number = 0) {
  return new Promise(resolve => setTimeout(resolve, timeInMs));
}

export function notNil<T>(value?: T | null): value is T {
  return typeof value !== 'undefined' && value !== null;
}

export function getRandomInt(min: number, max: number): number {
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

const BOUNCE_RATE = 500;

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

export const mapToAbout = (pokemon: Pokemon, species: Species): About => {
  return {
    abilities: pokemon.abilities,
    weight: pokemon.weight,
    height: pokemon.height,
    egg_groups: species.egg_groups,
    habitat: species.habitat,
    flavorText: species.flavor_text_entries
      .filter(t => t.language.name === 'en')[0]
      ?.flavor_text.replace(/(\r\n|\n|\r)/gm, ' '),
  };
};

export const mapToCustom = ({name, url}: {name: string; url: string}) => {
  const urlSplit = url.split('/');
  const id = urlSplit[urlSplit.length - 2];
  const picture = `${config.api.artwork}${id}.png`;

  return {id, picture, name};
};

export default {
  sleep,
  nil,
  notNil,
  isIndex,
  rateLimit,
};
