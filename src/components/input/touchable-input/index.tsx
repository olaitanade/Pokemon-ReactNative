import React, {FC, ReactElement} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import Body from 'components/text/body';
import GhostButton from 'components/button/ghost';
import classNames from 'classnames';
import textStyles from 'theme/text-styles';

type TouchableInputProps = {
  disabled?: boolean;
  leftAccessory?: ReactElement;
  rightAccessory?: ReactElement;
  placeholder?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: Fn;
};

const TouchableInput: FC<TouchableInputProps> = ({
  disabled,
  leftAccessory,
  rightAccessory,
  placeholder,
  style,
  className,
  onPress,
}) => {
  return (
    <GhostButton
      className={classNames('w-full bg-white', className)}
      style={style}
      disabled={disabled}
      onPress={onPress}>
      <View
        className="flex-row items-center"
        style={[textStyles.touchableinput]}>
        {leftAccessory}
        <Body className={'flex-1 text-black'}>{placeholder}</Body>
        {rightAccessory}
      </View>
    </GhostButton>
  );
};

export default TouchableInput;
