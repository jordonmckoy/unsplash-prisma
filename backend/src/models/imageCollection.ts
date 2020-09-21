// ImageCollection CRUD operations
import prisma from "../services/prisma";
import {
  CreateImageCollectionArgsType,
  DeleteImageCollectionArgsType,
  UpdateImageCollectionArgsType,
} from "./types";

export const createImageCollection = async ({
  description,
  name,
}: CreateImageCollectionArgsType) => {
  return await prisma.imageCollection.create({
    data: {
      description,
      name,
    },
  });
};
export const deleteImageCollection = async ({
  id,
}: DeleteImageCollectionArgsType) => {
  return await prisma.imageCollection.delete({
    where: {
      id: Number(id),
    },
  });
};
export const getAllImageCollections = async () => {
  return await prisma.imageCollection.findMany();
};
export const updateImageCollection = async ({
  id,
  description,
  name,
}: UpdateImageCollectionArgsType) => {
  return await prisma.imageCollection.update({
    where: {
      id: Number(id),
    },
    data: {
      description,
      name,
    },
  });
};
