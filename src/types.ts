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

export interface projectData {
  projectName: string;
  projectData: {
    titleIT: string;
    titleEN: string;
    descriptionIT: string;
    descriptionEN: string;
    projectUrl: string;
    portfolioUrl: string;
    githubUrl: string;
  };
}

export interface instagramPic {
  accessibilityCaption: string;
  caption: string;
  commentsNumber: number;
  dimensions: {
    height: number;
    width: number;
  };
  displayImage: string;
  id: string;
  likes: number;
  postLink: string;
  thumbnail: string;
}
