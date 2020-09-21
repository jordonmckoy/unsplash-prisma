import { CreateImageArgsType } from "../models/types";

export type InsertImageCollectionArgsType = {
  id?: number;
  description: string;
  imageArgs: CreateImageArgsType;
  imageId?: number;
  name: string;
};
