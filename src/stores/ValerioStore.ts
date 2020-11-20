import { action, observable } from 'mobx';
import { i18n, I18NLang } from '../i18n';

export default class HomeStore {
  @observable isAppLoading: boolean = true;
  @observable language: I18NLang = 'en';

  @action
  setLanguage = (lang: I18NLang) => {
    i18n.changeLanguage(lang);
    this.language = lang;
  };
}
