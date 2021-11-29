import { action, computed, observable } from 'mobx';
import { getCookieConsentValue } from 'react-cookie-consent';
import { i18n, I18NLang } from '../i18n';
import {
  ImageSource,
  InstagramPic,
  KnownTech,
  PortfolioProject,
} from '../types';
import instagram from '../utils/instagram';

export default class HomeStore {
  @observable isFetchingImages: boolean = true;
  @observable instagramFetchingStatus: 'completed' | 'loading' | 'failed' =
    'failed';

  @observable language: I18NLang = 'it';

  @observable sliderImages: Array<ImageSource> = [];
  @observable techMenuImages: Array<KnownTech> = [];
  @observable portfolioImages: Array<PortfolioProject> = [];
  @observable instagramImages: Array<InstagramPic> = [];
  @observable companiesLogos: Array<ImageSource> = [];

  @observable accountName: string = 'the_wanderer_developer';

  @observable cookieConsent: boolean =
    getCookieConsentValue('googleAnalytics') === 'true';

  @computed
  get isAppLoading() {
    return this.isFetchingImages;
  }

  @action
  setLanguage = (lang: I18NLang) => {
    i18n.changeLanguage(lang);
    this.language = lang;
  };

  @action
  fetchImages = async () => {
    this.isFetchingImages = true;
    this.sliderImages = [
      { alt: 'jetsky', img: require('../assets/images/slider/0.jpg') },
      { alt: 'skydive', img: require('../assets/images/slider/1.jpg') },
      { alt: 'work anywhere', img: require('../assets/images/slider/2.jpg') },
      { alt: 'wilderness', img: require('../assets/images/slider/3.jpg') },
      { alt: 'travel freely', img: require('../assets/images/slider/4.jpg') },
    ];
    this.isFetchingImages = false;
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
        alt: 'Django',
        img: require('../assets/images/techMenu/django.svg'),
        techName: 'Django',
      },
      {
        alt: 'Bootstrap',
        img: require('../assets/images/techMenu/bootstrap.svg'),
        techName: 'Bootstrap',
      },
      {
        alt: 'Html5',
        img: require('../assets/images/techMenu/html5.svg'),
        techName: 'Html5',
      },
      {
        alt: 'Css3',
        img: require('../assets/images/techMenu/css3.svg'),
        techName: 'Css3',
      },
      {
        alt: 'MongoDB',
        img: require('../assets/images/techMenu/mongodb.svg'),
        techName: 'MongoDB',
      },
      {
        alt: 'MySQL',
        img: require('../assets/images/techMenu/mysql.svg'),
        techName: 'MySQL',
      },
      {
        alt: 'SQLite',
        img: require('../assets/images/techMenu/sqlite.svg'),
        techName: 'SQLite',
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
        alt: 'Ethereum',
        img: require('../assets/images/techMenu/ethereum.svg'),
        techName: 'Ethereum',
      },
    ];
    this.portfolioImages = [
      {
        alt: 'Aenl',
        img: require('../assets/images/portfolio/aenl.jpg'),
        madeWith: ['Bootstrap', 'Html5', 'Css3'],
      },
      {
        alt: 'Malta',
        img: require('../assets/images/portfolio/malta.jpg'),
        madeWith: ['Django', 'Html5', 'Css3', 'MySQL'],
      },
      {
        alt: 'Crossborder',
        img: require('../assets/images/portfolio/crossborder.jpg'),
        madeWith: ['Django', 'Html5', 'Css3', 'MongoDB'],
      },
      {
        alt: 'Recwind',
        img: require('../assets/images/portfolio/recwind.jpg'),
        madeWith: ['Django', 'Html5', 'Css3', 'SQLite'],
      },
      {
        alt: 'Portfolio',
        img: require('../assets/images/portfolio/portfolio.jpg'),
        madeWith: ['React', 'Html5', 'Sass'],
      },
      {
        alt: 'Smartcontract',
        img: require('../assets/images/portfolio/smartcontract.jpg'),
        madeWith: ['Django', 'Html5', 'Css3', 'SQLite', 'Ethereum'],
      },
    ];
    this.companiesLogos = [
      {
        alt: 'Regione Marche',
        img: require('../assets/images/companies/logo_regione_marche.png'),
      },
      {
        alt: 'aenl',
        img: require('../assets/images/companies/logo_aenl.png'),
      },
      {
        alt: 'La Casa di Nicole',
        img: require('../assets/images/companies/logo_casa_nicole.png'),
      },
      {
        alt: 'Randy.gg',
        img: require('../assets/images/companies/logo_randy.png'),
      },
      {
        alt: 'ETT',
        img: require('../assets/images/companies/logo_ett.png'),
      },
      {
        alt: 'T33',
        img: require('../assets/images/companies/logo_t33.png'),
      },
      {
        alt: 'Mostaza',
        img: require('../assets/images/companies/logo_mostaza.png'),
      },
    ];
  };

  @action
  fetchInstagramPics = async () => {
    this.instagramFetchingStatus = 'loading';

    try {
      const cachedInstagramPics = localStorage.getItem('instagramPics');
      if (cachedInstagramPics) {
        this.instagramImages = JSON.parse(
          cachedInstagramPics,
        ) as InstagramPic[];
      } else {
        this.instagramImages = await instagram.getFeed(this.accountName);
        localStorage.setItem(
          'instagramPics',
          JSON.stringify(this.instagramImages),
        );
      }
      this.instagramFetchingStatus = 'completed';
    } catch (error) {
      console.warn(error);
      this.instagramFetchingStatus = 'failed';
    }
  };
}
