import React, {FC} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import classNames from 'classnames';
import Input from '..';
import Search from 'assets/svg/search.svg';

type SearchInputProps = {
  placeholder?: string;
  value?: string;
  className?: string;
  onChangeText?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
};

const SearchInput: FC<SearchInputProps> = ({
  placeholder,
  style,
  className,
  value,
  onChangeText,
}) => {
  return (
    <View
      className={classNames(
        'items-center rounded-lg py-6 bg-gray-300 px-12',
        className,
      )}
      style={[style]}>
      <Search width={20} height={20} />
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className={classNames('flex-1')}
      />
    </View>
  );
};

SearchInput.defaultProps = {
  placeholder: 'Search...',
};

export default SearchInput;
