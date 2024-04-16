import React, {FC, ReactElement} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import Body from 'components/text/body';
import GhostButton from 'components/button/ghost';
import classNames from 'classnames';
import textStyles from 'theme/text-styles';

type TouchableInputProps = {
  disabled?: boolean;
  leftAccessory?: ReactElement;
  placeholder?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: Fn;
};

//touchable input component, a button that looks like an input
const TouchableInput: FC<TouchableInputProps> = ({
  disabled,
  leftAccessory,
  placeholder,
  style,
  className,
  onPress,
}) => {
  return (
    <GhostButton
      className={classNames(
        'm-20 flex-1 flex-row rounded-md border border-gray-500 py-10 px-10',
        className,
      )}
      style={style}
      disabled={disabled}
      onPress={onPress}>
      <View
        className="flex-row items-center"
        style={[textStyles.touchableinput]}>
        {leftAccessory}
        <Body className={'flex-1 text-black ml-10'}>{placeholder}</Body>
      </View>
    </GhostButton>
  );
};

export default TouchableInput;
