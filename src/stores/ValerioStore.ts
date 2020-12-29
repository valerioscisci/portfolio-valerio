import { action, observable } from 'mobx';
import { i18n, I18NLang } from '../i18n';
import { ImageSource, knownTech, portfolioProject } from '../types';

export default class HomeStore {
  @observable isAppLoading: boolean = true;
  @observable language: I18NLang = 'en';
  @observable sliderImages: ImageSource[] = [];
  @observable techMenuImages: knownTech[] = [];
  @observable portfolioImages: portfolioProject[] = [];

  @action
  setLanguage = (lang: I18NLang) => {
    i18n.changeLanguage(lang);
    this.language = lang;
  };

  @action
  fetchImages = async () => {
    this.isAppLoading = true;
    this.sliderImages = [
      { alt: 'skydive', img: require('../assets/images/slider/0.jpg') },
      { alt: 'work anywhere', img: require('../assets/images/slider/1.jpg') },
      { alt: 'wilderness', img: require('../assets/images/slider/3.jpg') },
      { alt: 'travel freely', img: require('../assets/images/slider/4.jpg') },
    ];
    this.techMenuImages = [
      {
        alt: 'React',
        img: require('../assets/images/techMenu/react.svg'),
        techName: 'React',
      },
      {
        alt: 'React Native',
        img: require('../assets/images/techMenu/react_native.svg'),
        techName: 'React Native',
      },
      {
        alt: 'Sass',
        img: require('../assets/images/techMenu/sass.svg'),
        techName: 'Sass',
      },
      {
        alt: 'NodeJs',
        img: require('../assets/images/techMenu/nodejs.svg'),
        techName: 'NodeJs',
      },
      {
        alt: 'Bootstrap',
        img: require('../assets/images/techMenu/bootstrap.svg'),
        techName: 'Bootstrap',
      },
    ];
    this.portfolioImages = [
      {
        alt: 'Aenl',
        img: require('../assets/images/portfolio/aenl.jpg'),
        madeWith: ['Bootstrap'],
      },
    ];
    this.isAppLoading = false;
  };
}
