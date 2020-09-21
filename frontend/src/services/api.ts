import isEmpty from "lodash/isEmpty";
import download from "downloadjs";
import { ApiImageType } from "../types";

export type SearchPhotosArgsType = {
  callback?: () => void;
  query: string;
  optional?: { [key: string]: any };
};

const { REACT_APP_API_BASE_URL } = process.env;

// Collections

export const createCollection = async ({
  callback,
  description,
  image,
  imageId,
  name,
}: {
  callback?: () => void;
  description: string;
  image: ApiImageType;
  imageId?: number;
  name: string;
}) => {
  const result = await fetch(`${REACT_APP_API_BASE_URL}/collection`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description,
      image,
      imageId,
      name,
    }),
  }).then((res: any) => {
    return res.json();
  });

  if (callback) {
    callback();
  }

  return result;
};

export const updateCollection = async ({
  callback,
  description,
  name,
  id,
}: {
  callback?: () => void;
  description: string;
  name: string;
  id: number;
}) => {
  const result = await fetch(`${REACT_APP_API_BASE_URL}/collection/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      description
        ? {
            description,
          }
        : { name }
    ),
  }).then((res: any) => {
    return res.json();
  });

  if (callback) {
    callback();
  }

  return result;
};

export const fetchCollections = async ({
  callback,
}: {
  callback?: () => void;
}) => {
  const result = await fetch(`${REACT_APP_API_BASE_URL}/collections`).then(
    (res: any) => {
      return res.json();
    }
  );

  if (callback) {
    callback();
  }

  return result;
};

// Favourites

export const createFavourite = async ({
  callback,
  collection,
  image,
}: {
  callback?: () => void;
  collection: number;
  image: ApiImageType;
}) => {
  const result = await fetch(`${REACT_APP_API_BASE_URL}/favourite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collection,
      image,
    }),
  }).then((res: any) => {
    return res.json();
  });

  if (callback) {
    callback();
  }

  return result;
};

export const deleteFavourite = async ({
  callback,
  id,
}: {
  callback?: () => void;
  id: number;
}) => {
  const result = await fetch(`${REACT_APP_API_BASE_URL}/favourite/${id}`, {
    method: "DELETE",
  }).then((res: any) => {
    return res.json();
  });

  if (callback) {
    callback();
  }

  return result;
};

export const updateFavourite = async ({
  callback,
  collection,
  id,
}: {
  callback?: () => void;
  collection: number;
  id: number;
}) => {
  const result = await fetch(`${REACT_APP_API_BASE_URL}/favourite/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collection,
    }),
  }).then((res: any) => {
    return res.json();
  });

  if (callback) {
    callback();
  }

  return result;
};

export const fetchFavourites = async ({
  callback,
}: {
  callback?: () => void;
}) => {
  const result = await fetch(`${REACT_APP_API_BASE_URL}/favourites`).then(
    (res: any) => {
      return res.json();
    }
  );

  if (callback) {
    callback();
  }

  return result;
};

export const fetchFavourite = async ({
  callback,
  id,
}: {
  callback?: () => void;
  id: number;
}) => {
  const result = await fetch(`${REACT_APP_API_BASE_URL}/favourite/${id}`).then(
    (res: any) => {
      return res.json();
    }
  );

  if (callback) {
    callback();
  }

  return result;
};

// Download

export const downloadPhoto = async (link: string) => {
  const result = await fetch(
    `${REACT_APP_API_BASE_URL}/download?link=${link}`
  ).then((res: any) => {
    return res.blob();
  });

  download(result, "image.jpg", "image/jpeg");
};

// Search

export const searchPhotos = async ({
  callback,
  query,
  optional,
}: SearchPhotosArgsType) => {
  let formattedOptions = "";

  if (!isEmpty) {
    // reduce optional args into query string
  }

  const result = await fetch(
    `${REACT_APP_API_BASE_URL}/search?q=${query}&${formattedOptions}`
  ).then((res: any) => {
    return res.json();
  });

  if (callback) {
    callback();
  }

  return result;
};
