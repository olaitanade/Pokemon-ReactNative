import React, {FC, useEffect, useState} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import classNames from 'classnames';
import Input from '..';
import Search from 'assets/svg/search.svg';
import {useDebounce} from 'core/util/utils';

type SearchInputProps = {
  placeholder?: string;
  className?: string;
  onDebounceText?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
};

const SearchInput: FC<SearchInputProps> = ({
  placeholder,
  style,
  className,
  onDebounceText,
}) => {
  const [query, setQuery] = useState('');
  const {debounce} = useDebounce();

  useEffect(() => {
    debounce(() => {
      onDebounceText?.(query);
    });
  }, [debounce, onDebounceText, query]);
  return (
    <View
      className={classNames(
        'm-20 items-center flex-row rounded-md border border-gray-500 py-10 px-10 bg-white',
        className,
      )}
      style={[style]}>
      <Search width={20} height={20} />
      <Input
        autoFocus={true}
        value={query}
        onChangeText={setQuery}
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
