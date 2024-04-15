import {DependencyList, useCallback, useEffect, useMemo, useState} from 'react';
import {
  InteractionManager,
  Keyboard,
  KeyboardEventName,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import {
  StackActions,
  useFocusEffect,
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import config from 'core/config';
import { sleep } from 'core/util/utils';

export function useRouter() {
  const navigation = useNavigation<any>();
  const replace = useCallback(
    (name: string, params?: object) => {
      navigation.dispatch(StackActions.replace(name, params));
    },
    [navigation],
  );
  const router = useMemo(
    () => ({...navigation, replace}),
    [navigation, replace],
  );

  return router;
}

export function useRouterState() {
  return useNavigationState(o => o);
}

export function useActivity<T = Record<string, boolean>>(
  initial: T,
): [T, (data: Partial<T>) => void] {
  const [state, setState] = useState(initial);
  const setActivity = useCallback((data: Partial<T>) => {
    setState(o => ({...o, ...data}));
  }, []);

  return [state, setActivity];
}

export function useFocused<T extends (...args: any[]) => any>(
  callback: T,
  deps?: DependencyList,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useFocusEffect(useCallback(callback, deps ?? []));
}

export function useDarkStatusBar() {
  return useFocused(() => {
    StatusBar.setBarStyle('dark-content');
  });
}

export function useLightStatusBar() {
  return useFocused(() => {
    StatusBar.setBarStyle('light-content');
  });
}

export function useKeyboardVisible(): boolean {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent = Platform.select({
      ios: 'keyboardWillShow',
      android: 'keyboardDidShow',
    }) as KeyboardEventName;
    const hideEvent = Platform.select({
      ios: 'keyboardWillHide',
      android: 'keyboardDidHide',
    }) as KeyboardEventName;

    const showEventListener = () => setKeyboardVisible(true);
    const hideEventListener = () => setKeyboardVisible(false);

    Keyboard.addListener(showEvent, showEventListener);
    Keyboard.addListener(hideEvent, hideEventListener);

    return () => {
      Keyboard.removeAllListeners(showEvent);
      Keyboard.removeAllListeners(hideEvent);
    };
  }, []);

  return keyboardVisible;
}

export function useAutofocus(
  ref: React.MutableRefObject<TextInput> | React.RefObject<TextInput>,
) {
  return useCallback(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      ref.current?.focus();
    });

    return () => task.cancel();
  }, [ref]);
}

export function useRouteParams<T extends object>() {
  const route = useRoute();
  return (route.params ?? {}) as T;
}

export function useModalUtils(
  initialOpen: boolean = false,
  animationDuration = config.modalize.duration,
): ModalActions {
  const [visible, setVisible] = useState(initialOpen);

  const handleOpen = useCallback(() => {
    Keyboard.dismiss();
    setVisible(true);
  }, []);

  const handleClose = useCallback(async () => {
    setVisible(false);
    await sleep(animationDuration);
    return Promise.resolve();
  }, [animationDuration]);

  const handleToggle = useCallback(() => {
    setVisible(o => !o);
  }, []);

  const actions: ModalActions = useMemo(
    () => ({
      visible,
      open: handleOpen,
      close: handleClose,
      toggle: handleToggle,
    }),
    [handleClose, handleOpen, handleToggle, visible],
  );

  return actions;
}
