import LocalizedStrings from 'react-native-localization';

const strings = new LocalizedStrings({
  en: {
    welcome: 'Welcome',
    hello: 'Hello',
    goodbye: 'Goodbye',
  },
});

export function setStrings(to: Record<string, Record<string, string>>) {
  strings.setContent({...(strings as any).getContent(), ...to});
}

export function setRaceLanguage(language: string) {
  strings.setLanguage(language);
}

export default strings;
