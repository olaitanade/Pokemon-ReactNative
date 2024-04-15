import React, {FC, useMemo} from 'react';
import {Text, TextProps} from 'react-native';
import theme from 'theme';

const Subhead: FC<TextWeightProps & TextProps> = ({
  children,
  style,
  className,
  weight,
  ...rest
}) => {
  const sizeStyleName = useMemo(() => `text${weight}`, [weight]);

  return (
    <Text
      className={className}
      style={[
        theme.textStyles.common,
        theme.textStyles[sizeStyleName],
        theme.textStyles.subhead,
        style,
      ]}
      {...rest}>
      {children}
    </Text>
  );
};

Subhead.defaultProps = {
  weight: 'regular',
};

export default Subhead;
