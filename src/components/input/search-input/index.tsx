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
        'm-20 items-center flex-row rounded-md border border-gray-500 py-10 px-10 bg-white',
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
