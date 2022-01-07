export interface ImageSource {
  alt: string;
  img: string;
}

export interface KnownTech extends ImageSource {
  techName: string;
}

export interface PortfolioProject extends ImageSource {
  madeWith: string[];
}

export interface ProjectData {
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

export interface InstagramPic {
  accessibilityCaption?: string;
  caption?: string;
  commentsNumber?: number;
  dimensions?: {
    height?: number;
    width?: number;
  };
  displayImage?: string;
  id?: string;
  likes?: number;
  postLink?: string;
  thumbnail?: string;
}

export interface Review {
  writerName: string;
  reviewIT: string;
  reviewEN: string;
  company: string;
}

export type BlogPost = {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    cover_image: string;
    description: string;
    category: Array<string>;
    locale: string;
  };
  content?: any;
};
