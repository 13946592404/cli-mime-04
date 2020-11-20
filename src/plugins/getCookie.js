import Cookie from 'js-cookie';

const getLocale = () => {
  const LANG_COOKIE = Cookie.get('APP_LANG');
  const LANG_BROWSER = navigator.language || navigator.browserLanguage;
  const langMap = new Map([
    ['en-US', 'en'],
    ['zh-CN', 'ch'],
  ]);
  return langMap.get(LANG_COOKIE) || langMap.get(LANG_BROWSER);
};

const hasAuth = () => Cookie.get('auth') !== undefined;

export default {
  getLocale,
  hasAuth,
};
