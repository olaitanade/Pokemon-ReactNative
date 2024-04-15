import {Platform, TextInput, TextInputProps} from 'react-native';
import React, {Ref, forwardRef} from 'react';
import colors from 'theme/data/colors.json';
import theme from 'theme';
import classNames from 'classnames';

const BaseInput = (
  {
    style,
    placeholderTextColor,
    className,
    selectionColor,
    value,
    keyboardType,
    ...rest
  }: TextInputProps,
  ref: Ref<TextInput>,
) => {
  return (
    <TextInput
      ref={ref}
      style={[theme.textStyles.displayregular, theme.textStyles.input, style]}
      className={classNames('bg-white', className)}
      placeholderTextColor={placeholderTextColor ?? colors.gray[400]}
      keyboardType={keyboardType ?? 'default'}
      textAlignVertical={'top'}
      selectionColor={
        selectionColor ??
        Platform.select({
          android: colors.blue[300],
          ios: colors.blue[300],
        })
      }
      value={typeof value === 'number' ? (value as any).toString() : value}
      autoCapitalize="none"
      autoCorrect={false}
      autoComplete="off"
      {...rest}
    />
  );
};

const Input = forwardRef(BaseInput);

export default Input;
