import {
  createImage,
  deleteImage,
  getImage,
  getImages,
  updateImage,
} from "../models/image";
import {
  CreateImageArgsType,
  DeleteImageArgsType,
  GetImageArgsType,
  UpdateImageArgsType,
} from "../models/types";

export const insertFavourite = (args: CreateImageArgsType) => {
  return createImage(args);
};

export const removeFavourite = (args: DeleteImageArgsType) => {
  return deleteImage(args);
};

export const findFavourite = (args: GetImageArgsType) => {
  return getImage(args);
};

export const findFavourites = () => {
  return getImages();
};

export const modifyFavourite = (args: UpdateImageArgsType) => {
  return updateImage(args);
};
