import {Pressable, StyleProp, ViewStyle} from 'react-native';
import React, {FC, PropsWithChildren, memo} from 'react';

import config from 'core/config';
import classNames from 'classnames';

type GhostButtonProps = PropsWithChildren<{
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: Fn;
}>;

// GhostButton component, wrapper for Pressable
const BaseGhostButton: FC<GhostButtonProps> = ({
  disabled,
  readonly,
  className,
  style,
  children,
  onPress,
}) => {
  return (
    <Pressable
      hitSlop={config.hitSlop}
      disabled={disabled || readonly}
      onPress={onPress}
      style={style}
      className={classNames(
        'justify-center items-center',
        {
          'opacity-50': disabled,
          'opacity-100': readonly,
        },
        className,
      )}>
      {children}
    </Pressable>
  );
};

const GhostButton = memo(BaseGhostButton);

export default GhostButton;
