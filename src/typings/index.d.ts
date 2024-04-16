type Optional<T> = T | undefined;

type Fn<T = any> = (...args: any[]) => T;

type AsyncFn<T = any> = (...args: any[]) => Promise<T>;

type TextWeightProps = {
  weight?: FontWeightTypes;
};

type RequestStatus = 'success' | 'error' | 'loading' | 'idle';

type ModalActions = {
  visible: boolean;
  open: Fn;
  close: () => Promise<void>;
  toggle: Fn;
};

type WalkThroughData = {
  key: string;
  title?: string;
  description?: string;
  image?: string | ImageSourcePropType;
  type?: 'remote' | 'local';
};
