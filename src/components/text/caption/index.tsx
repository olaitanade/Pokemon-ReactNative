import React, {FC, useMemo} from 'react';
import {Text, TextProps} from 'react-native';

import theme from 'theme';

const Caption: FC<TextWeightProps & TextProps> = ({
  children,
  style,
  weight,
  ...rest
}) => {
  const sizeStyleName = useMemo(() => `text${weight}`, [weight]);

  return (
    <Text
      style={[
        theme.textStyles.common,
        theme.textStyles[sizeStyleName],
        theme.textStyles.caption,
        style,
      ]}
      {...rest}>
      {children}
    </Text>
  );
};

Caption.defaultProps = {
  weight: 'regular',
};

export default Caption;
