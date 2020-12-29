import ValerioStore from './stores/ValerioStore';

export interface Stores {
  home: ValerioStore;
}

export interface ImageSource {
  alt: string;
  img: { default: string };
}

export interface knownTech extends ImageSource {
  techName: string;
}

export interface portfolioProject extends ImageSource {
  madeWith: string[];
}
