import ImageColors from 'react-native-image-colors';

// get image colors
export const getImageColors = async (uri: string) => {
  const colors = await ImageColors.getColors(uri, {
    fallback: '#f44336',
  });

  let primary, secondary;

  switch (colors.platform) {
    case 'android':
      primary = colors.darkMuted;
      secondary = colors.dominant;
      break;
    case 'ios':
      primary = colors.primary;
      secondary = colors.background;
      break;
    default:
      throw new Error('Unexpected platform');
  }

  return [primary, secondary];
};
