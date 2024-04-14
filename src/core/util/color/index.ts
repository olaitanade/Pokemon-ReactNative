import ImageColors from 'react-native-image-colors';

export const getImageColors = async (uri: string) => {
  const colors = await ImageColors.getColors(uri, {
    fallback: '#f44336',
  });

  let primary, secondary;

  switch (colors.platform) {
    case 'android':
      primary = colors.dominant;
      secondary = colors.darkMuted;
      break;
    case 'ios':
      primary = colors.primary;
      secondary = colors.secondary;
      break;
    default:
      throw new Error('Unexpected platform');
  }

  return [primary, secondary];
};
