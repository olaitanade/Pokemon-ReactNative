type Optional<T> = T | undefined;

type Fn<T = any> = (...args: any[]) => T;

type AsyncFn<T = any> = (...args: any[]) => Promise<T>;

type TextWeightProps = {
  weight?: FontWeightTypes;
};

type RequestStatus = 'success' | 'error' | 'loading' | 'idle';
