export type CreateImageArgsType = {
  collection?: number;
  description: string;
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  portfolio: string;
  unsplashId: string;
};

export type DeleteImageArgsType = {
  id: number;
};

export type GetImageArgsType = {
  id: number;
};

export type UpdateImageArgsType = {
  id: number;
  collection: number;
};

export type CreateImageCollectionArgsType = {
  description: string;
  name: string;
};

export type DeleteImageCollectionArgsType = {
  id: number;
};

export type GetImageCollectionArgsType = {
  id: number;
};

export type UpdateImageCollectionArgsType = {
  id: number;
  description?: string;
  name?: string;
};
