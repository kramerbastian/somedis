export const supportedLocales = ['en', 'de'];
export const defaultLocale = 'en';

export function getLocalizedLink(path: string, lang: string) {
  supportedLocales.forEach((locale) => {
    const prefix = `/${locale}`;
    if (path.startsWith(prefix)) {
      path = path.slice(prefix.length);
    }
  });

  if (path[0] == '/') {
    return `/${lang}${path}`;
  } else {
    return `/${lang}/${path}`;
  }
}
