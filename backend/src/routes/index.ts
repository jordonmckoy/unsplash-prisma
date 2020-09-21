import express, { Request, Response } from "express";
import path from "path";
import url from "url";
import ChildProcess from "child_process";
import {
  findFavourite,
  findFavourites,
  insertFavourite,
  modifyFavourite,
  removeFavourite,
} from "../controllers/image";
import {
  findAllImageCollections,
  insertImageCollection,
  modifyImageCollection,
} from "../controllers/imageCollection";
import { searchPhotos } from "../services/unsplash";

const { DOWNLOAD_DIR = "" } = process.env;

const router = express.Router();

/**
 * GET images - Fetches images from unsplash api
 */
router.get("/search", async (req: Request, res: Response) => {
  const { q, ...rest } = req.query;
  const result = await searchPhotos({ query: q, optional: rest });
  res.json(result);
});

/**
 * GET collections - Fetches list of collections from database
 */
router.get("/collections", async (req: Request, res: Response) => {
  const result = await findAllImageCollections();
  res.json(result);
});

/**
 * GET favourites - Fetches saved images from the database
 */
router.get("/favourites", async (req: Request, res: Response) => {
  const result = await findFavourites();
  res.json(result);
});

/**
 * GET favourite - Fetch a single saved image from the database
 */
router.get("/favourite/:id", async (req: Request, res: Response) => {
  const { id = undefined } = req.params;
  if (id) {
    const result = await findFavourite({ id: Number(id) });
    res.json(result);
  } else {
    res.json([]);
  }
});

/**
 * GET download - Download an image
 */
router.get("/download", async (req: Request, res: Response) => {
  const { link = "" } = req.query;

  const fileName =
    url
      ?.parse(link as string)
      ?.pathname?.split("/")
      .pop() ?? "";
  const wget = `wget --output-document ${DOWNLOAD_DIR}/${fileName} ${link}`;

  const child = ChildProcess.exec(wget, function (err, stdout, stderr) {
    if (err) throw err;
    else {
      console.log(fileName, "was downloaded successfully!");
      res.download(path.resolve(DOWNLOAD_DIR, fileName));
    }
  });
});

/**
 * DELETE favourite - Delete a single saved image from the database
 */
router.delete("/favourite/:id", async (req: Request, res: Response) => {
  const { id = undefined } = req.params;
  if (id) {
    const result = await removeFavourite({ id: Number(id) });
    res.json(result);
  } else {
    res.json([]);
  }
});

/**
 * POST collection - Create a new collection in the database
 */
router.post("/collection", async (req: Request, res: Response) => {
  const { description, image, imageId, name } = req.body;

  const result = await insertImageCollection({
    description,
    imageArgs: image,
    imageId,
    name,
  });
  res.json(result);
});

/**
 * POST favourite - Create a new favourite in the database
 */
router.post("/favourite", async (req: Request, res: Response) => {
  const { collection, image } = req.body;

  const result = await insertFavourite({
    collection,
    ...image,
  });
  res.json(result);
});

/**
 * PUT collection - Update a collection in the database
 */
router.put("/collection/:id", async (req: Request, res: Response) => {
  const { id = undefined } = req.params;
  const { description, name } = req.body;

  const result = await modifyImageCollection({
    id: Number(id),
    description,
    name,
  });
  res.json(result);
});

/**
 * PUT favourite - Update a saved image in the database
 */
router.put("/favourite/:id", async (req: Request, res: Response) => {
  const { id = undefined } = req.params;
  const { collection } = req.body;

  if (id) {
    const result = await modifyFavourite({
      id: Number(id),
      collection: Number(collection),
    });
    res.json(result);
  } else {
    res.json([]);
  }
});

export default router;
