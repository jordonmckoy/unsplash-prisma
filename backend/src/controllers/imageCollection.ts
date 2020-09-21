import { InsertImageCollectionArgsType } from "./types";
import {
  createImageCollection,
  deleteImageCollection,
  getAllImageCollections,
  updateImageCollection,
} from "../models/imageCollection";
import {
  DeleteImageCollectionArgsType,
  UpdateImageCollectionArgsType,
} from "../models/types";

import { insertFavourite, modifyFavourite } from "./image";

export const insertImageCollection = async ({
  description,
  id,
  imageArgs,
  imageId,
  name,
}: InsertImageCollectionArgsType) => {
  const collection = await createImageCollection({ description, name });
  let image;

  if (imageId) {
    image = await modifyFavourite({
      id: imageId,
      collection: collection?.id,
    });
  } else {
    image = await insertFavourite({
      ...imageArgs,
      collection: collection?.id,
    });
  }

  return { collection, image };
};

export const removeImageCollection = (args: DeleteImageCollectionArgsType) => {
  return deleteImageCollection(args);
};

export const findAllImageCollections = () => {
  return getAllImageCollections();
};

export const modifyImageCollection = (args: UpdateImageCollectionArgsType) => {
  return updateImageCollection(args);
};
