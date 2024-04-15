import React, {FC, useMemo} from 'react';
import {Text, TextProps} from 'react-native';
import textStyles from 'theme/text-styles';

const Body: FC<TextWeightProps & TextProps> = ({
  children,
  style,
  className,
  weight,
  ...rest
}) => {
  const sizeStyleName = useMemo(() => `display${weight}`, [weight]);

  return (
    <Text
      className={className}
      style={[textStyles[sizeStyleName], textStyles.body, style]}
      {...rest}>
      {children}
    </Text>
  );
};

Body.defaultProps = {
  weight: 'regular',
};

export default Body;
