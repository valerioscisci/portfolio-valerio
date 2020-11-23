import { action, observable } from 'mobx';
import { i18n, I18NLang } from '../i18n';

export default class HomeStore {
  @observable isAppLoading: boolean = true;
  @observable language: I18NLang = 'en';
  @observable sliderImages: { alt: string; img: { default: string } }[] = [];

  @action
  setLanguage = (lang: I18NLang) => {
    i18n.changeLanguage(lang);
    this.language = lang;
  };

  @action
  fetchImages = async () => {
    this.isAppLoading = true;
    this.sliderImages = [
      { alt: 'skydive', img: require('../assets/images/slider/0.png') },
      { alt: 'work anywhere', img: require('../assets/images/slider/1.png') },
      { alt: 'wilderness', img: require('../assets/images/slider/3.png') },
      { alt: 'travel freely', img: require('../assets/images/slider/4.png') },
    ];
    this.isAppLoading = false;
  };
}
