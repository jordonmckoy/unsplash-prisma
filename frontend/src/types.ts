export type ApiImageType = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  description: string;
  portfolio: string;
  unsplashId: number;
};

export type CollectionType = {
  description: string;
  id: number;
  name: string;
};

export type RawImageType = {
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user?: {
    links?: {
      html?: string;
    };
  };
  description: string;
  id: number;
};

export type UnsplashImageType = {
  height: number;
  width: number;
} & RawImageType;
