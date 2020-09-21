import Unsplash, { toJson } from "unsplash-js";
import fetch from "node-fetch";
import { SearchPhotosArgsType } from "./types";
import { isDate } from "util";

if (!(globalThis as any).fetch) {
  (globalThis as any).fetch = fetch;
}

// @ts-ignore
const { UNSPLASH_ACCESS_KEY = "" } = process.env;

const unsplash = new Unsplash({ accessKey: UNSPLASH_ACCESS_KEY });

export const searchPhotos = async (args: SearchPhotosArgsType) => {
  const { query = "", optional } = args;
  return unsplash.search
    .photos(query, 1, 10, { ...optional })
    .then(toJson)
    .then((res: any) => {
      return res.results.map(
        ({ id, description, height, user, urls, width }: any) => ({
          id,
          description,
          height,
          user,
          urls,
          width,
        })
      );
    })
    .catch((e) => console.warn("Search photo error", e));
};

export default unsplash;
