import {
  Platform,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {FC, PropsWithChildren, useEffect, useRef} from 'react';

import Animated from 'react-native-reanimated';
import ModalHandle from '../handle';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import classNames from 'classnames';

type ModalBaseProps = PropsWithChildren<{
  avoidKeyboard?: boolean;
  blurBackground?: boolean;
  fitContent?: boolean;
  style?: StyleProp<ViewStyle>;
  className?: string;
  modalStyle?: StyleProp<ViewStyle>;
  showHandle?: boolean;
  visible?: boolean;
  onRequestClose?: Fn;
}>;

const ModalBase: FC<ModalBaseProps> = ({
  children,
  visible,
  fitContent,
  style,
  className,
  modalStyle,
  showHandle,
  onRequestClose,
}) => {
  const modalizeRef = useRef<Modalize>();

  useEffect(() => {
    if (visible) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [visible]);

  const customRendererFn = () => {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Animated.View
          className={classNames(
            'bg-transparent rounded-t-3xl',
            {
              'pt-0': showHandle,
            },
            className,
          )}
          style={style}>
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Portal>
      <Modalize
        withHandle={false}
        ref={modalizeRef}
        adjustToContentHeight={fitContent}
        closeOnOverlayTap
        onClosed={onRequestClose}
        HeaderComponent={<ModalHandle />}
        // eslint-disable-next-line react-native/no-inline-styles
        modalStyle={[{backgroundColor: 'white'}, modalStyle]}
        customRenderer={customRendererFn()}
        keyboardAvoidingBehavior={Platform.select({
          android: 'height',
          ios: 'padding',
        })}
      />
    </Portal>
  );
};

ModalBase.defaultProps = {
  showHandle: true,
};

export default ModalBase;
