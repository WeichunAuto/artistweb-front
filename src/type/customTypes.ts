export type MenuItem = {
  id: number;
  name: string;
  href: string;
  disable: boolean;
  parent?: any;
  children?: any;
};

export type PaintWork = {
  id: number;
  title: string;
  description: string;
  price: number;
  status: string;
  date: string;
  year: string;
  dimensionWidth: number;
  dimensionHeight: number;
  decorationCount: number;
  coverURL: string;
}

export type Decoration = {
  id: number,
  imageName: string,
  imageType: string,
  cover: boolean,
  original: string,
  thumbnail: string
}