import React, {FC, useMemo} from 'react';
import {Text, TextProps} from 'react-native';
import theme from 'theme';

const Title: FC<TextWeightProps & TextProps> = ({
  children,
  style,
  weight,
  ...rest
}) => {
  const sizeStyleName = useMemo(() => `display${weight}`, [weight]);

  return (
    <Text
      style={[
        theme.textStyles.common,
        theme.textStyles[sizeStyleName],
        theme.textStyles.title,
        style,
      ]}
      {...rest}>
      {children}
    </Text>
  );
};

Title.defaultProps = {
  weight: 'regular',
};

export default Title;
