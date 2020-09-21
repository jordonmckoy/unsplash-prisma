import {
  createFavourite,
  createCollection,
  deleteFavourite,
  updateFavourite,
} from "../services/api";
import { RawImageType } from "../types";

type AddRemoveListType = {
  callback?: (args?: any) => void;
  collectionId: number;
  image: RawImageType;
};

type SubmitListType = {
  callback?: (args?: any) => void;
  description: string;
  image: RawImageType;
  imageId?: number;
  name: string;
};

export const handleAddToList = async ({
  collectionId,
  image,
  callback,
}: AddRemoveListType) => {
  await createFavourite({
    collection: collectionId,
    image: {
      raw: image?.urls?.raw,
      full: image?.urls?.full,
      regular: image?.urls?.regular,
      small: image?.urls?.small,
      thumb: image?.urls?.thumb,
      description: image?.description,
      portfolio: image?.user?.links?.html || "",
      unsplashId: image?.id,
    },
  });
  if (callback) {
    callback();
  }
};

export const handleRemoveFromList = async ({
  id,
  callback,
}: {
  id: number;
  callback: (args?: any) => void;
}) => {
  await deleteFavourite({
    id,
  });
  if (callback) {
    callback();
  }
};

export const handleSubmitList = async ({
  description,
  name,
  image,
  imageId,
  callback,
}: SubmitListType) => {
  await createCollection({
    description,
    name,
    image: {
      raw: image?.urls?.raw,
      full: image?.urls?.full,
      regular: image?.urls?.regular,
      small: image?.urls?.small,
      thumb: image?.urls?.thumb,
      description: image?.description,
      portfolio: image?.user?.links?.html || "",
      unsplashId: image?.id,
    },
    imageId,
  });
  if (callback) {
    callback();
  }
};

export const handleUpdateList = async ({
  collectionId,
  id,
  callback,
}: {
  collectionId: number;
  id: number;
  callback: (args?: any) => void;
}) => {
  await updateFavourite({ id, collection: collectionId });
  if (callback) {
    callback();
  }
};
