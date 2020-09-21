// Image CRUD operations
import prisma from "../services/prisma";
import {
  CreateImageArgsType,
  DeleteImageArgsType,
  GetImageArgsType,
  UpdateImageArgsType,
} from "./types";

export const createImage = async ({
  collection,
  description,
  raw,
  full,
  regular,
  small,
  thumb,
  portfolio,
  unsplashId,
}: CreateImageArgsType) => {
  return await prisma.image.create({
    data: {
      raw,
      full,
      regular,
      small,
      thumb,
      description,
      portfolio,
      unsplashId,
      ImageCollection: {
        connect: {
          id: collection,
        },
      },
    },
  });
};
export const deleteImage = async ({ id }: DeleteImageArgsType) => {
  return await prisma.image.delete({
    where: {
      id,
    },
  });
};
export const getImage = async ({ id }: GetImageArgsType) => {
  return await prisma.image.findOne({
    where: {
      id,
    },
  });
};
export const getImages = async () => {
  const result = await prisma.image.findMany();

  return result.map((photo) => ({
    id: photo.id,
    imageCollectionId: photo.imageCollectionId,
    description: photo.description,
    portfolio: photo.portfolio,
    unsplashId: photo.unsplashId,
    urls: {
      full: photo.full,
      raw: photo.raw,
      regular: photo.regular,
      small: photo.small,
      thumb: photo.thumb,
    },
  }));
};
export const updateImage = async ({ id, collection }: UpdateImageArgsType) => {
  return await prisma.image.update({
    where: {
      id,
    },
    data: {
      ImageCollection: {
        connect: {
          id: collection,
        },
      },
    },
  });
};
