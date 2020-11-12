import Cookie from 'js-cookie';

const getLocale = () => {
  const LANG_COOKIE = 'APP_LANG';
  const LANG_MAP = new Map([
    ['en-US', 'en'],
    ['zh-CN', 'ch'],
  ]);
  return LANG_MAP.get(Cookie.get(LANG_COOKIE)) // Cookie值不在map的key中则返回undefined，向后查找
  || LANG_MAP.get(navigator.language || navigator.browserLanguage); // 兼容多浏览器
};

export default getLocale;
