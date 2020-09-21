import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import debounce from "lodash/debounce";

import MainLayout from "../../layouts/main";
import PhotoCard from "../../components/PhotoCard";
import PhotoModal from "../../components/PhotoModal";
import SearchInput from "../../components/SearchInput";
import {
  handleAddToList,
  handleRemoveFromList,
  handleSubmitList,
  handleUpdateList,
} from "../../helpers";
import {
  downloadPhoto,
  fetchCollections,
  fetchFavourites,
  searchPhotos,
} from "../../services/api";
import { UnsplashImageType } from "../../types";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  photoCard: {
    margin: "1rem",
  },
});

const debouncedFetch = debounce(async (query, callback) => {
  const res = await searchPhotos({ query });
  callback(res);
}, 500);

const Search = () => {
  const classes = useStyles();
  const [collections, setCollections] = useState([]);
  const [favourites, setFavourites] = useState({});
  const [totalFavourites, setTotalFavourites] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState({});
  const [photos, setPhotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    const collectionResult = await fetchCollections({ callback: undefined });
    setCollections(collectionResult);

    const favouritesResult = await fetchFavourites({ callback: undefined });
    setTotalFavourites(favouritesResult.length);
    const groupedFavourites = favouritesResult.reduce((acc: any, cur: any) => {
      acc[cur?.unsplashId] = cur;

      return acc;
    }, {});

    setFavourites(groupedFavourites);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChange = (e: any) => {
    debouncedFetch(e.target.value, (res: any) => {
      setPhotos(
        res?.map((photo: UnsplashImageType) => ({
          ...photo,
          collectionId:
            (favourites as { [key: string]: any })?.[`${photo?.id}`]?.[
              "imageCollectionId"
            ] || null,
          dbId:
            (favourites as { [key: string]: any })?.[`${photo?.id}`]?.["id"] ||
            null,
        }))
      );
    });
  };

  return (
    <>
      <MainLayout totalFavourites={totalFavourites}>
        <SearchInput onChange={onChange} />
        <Box className={classes.container}>
          {photos.map((photo: UnsplashImageType) => (
            <Box className={classes.photoCard}>
              <PhotoCard
                description={photo.description}
                id={photo.id}
                urls={photo.urls}
                portfolio={photo.user?.links?.html}
                downloadAction={() => downloadPhoto(photo?.urls?.full)}
                favouriteAction={() => {
                  setSelectedPhoto(photo);
                  setIsModalOpen(true);
                }}
              />
            </Box>
          ))}
        </Box>
      </MainLayout>
      <PhotoModal
        isOpen={isModalOpen}
        handleAddToList={(args) =>
          handleAddToList({ callback: fetchData, ...args })
        }
        handleClose={() => {
          setIsModalOpen(false);
          setSelectedPhoto({});
        }}
        handleRemoveFromList={(args) =>
          handleRemoveFromList({ callback: fetchData, ...args })
        }
        handleSubmitList={(args) =>
          handleSubmitList({ callback: fetchData, ...args })
        }
        handleUpdateList={(args) =>
          handleUpdateList({ callback: fetchData, ...args })
        }
        collections={collections}
        photo={selectedPhoto}
      />
    </>
  );
};

export default Search;
