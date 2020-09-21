import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import debounce from "lodash/debounce";

import MainLayout from "../../layouts/main";
import PhotoCard from "../../components/PhotoCard";
import PhotoModal from "../../components/PhotoModal";
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
  updateCollection,
} from "../../services/api";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  collection: {
    display: "flex",
    flexDirection: "column",
  },
  listTitle: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem 0",
  },
  photoCarousel: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#ecf4f9",
  },
  photoCard: {
    margin: "1rem",
  },
  textInput: {
    width: 300,
  },
});

const debouncedCollectionUpdate = debounce(
  async ({ description = undefined, id, name = undefined }, callback) => {
    const res = await updateCollection({ description, id, name });
    callback(res);
  },
  500
);

const Favourites = () => {
  const classes = useStyles();
  const [collections, setCollections] = useState([]);
  const [favourites, setFavourites] = useState({});
  const [totalFavourites, setTotalFavourites] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    const collectionResult = await fetchCollections({ callback: undefined });
    setCollections(collectionResult);

    const favouritesResult = await fetchFavourites({ callback: undefined });
    setTotalFavourites(favouritesResult.length);
    const groupedFavourites = favouritesResult.reduce((acc: any, cur: any) => {
      if (acc[cur?.imageCollectionId]) {
        acc[cur?.imageCollectionId].push(cur);
      } else {
        acc[cur?.imageCollectionId] = [cur];
      }

      return acc;
    }, {});

    setFavourites(groupedFavourites);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChange = (args: {
    description?: string;
    id: number;
    name?: string;
  }) => {
    debouncedCollectionUpdate(args, () => {});
  };

  return (
    <>
      <MainLayout totalFavourites={totalFavourites}>
        <Box className={classes.container}>
          {collections?.map(
            (collection: { name: string; description: string; id: number }) => (
              <>
                <Box className={classes.collection}>
                  <Box className={classes.listTitle}>
                    <TextField
                      id="collection-name"
                      label="Name"
                      className={classes.textInput}
                      defaultValue={collection?.name}
                      size="small"
                      onChange={(e) =>
                        onChange({
                          id: collection?.id,
                          name: e.target.value,
                        })
                      }
                    />
                    <TextField
                      id="collection-description"
                      label="Description"
                      className={classes.textInput}
                      defaultValue={collection?.description}
                      size="small"
                      onChange={(e) =>
                        onChange({
                          id: collection?.id,
                          description: e.target.value,
                        })
                      }
                    />
                  </Box>
                  <Box className={classes.photoCarousel}>
                    {(favourites as any)?.[collection.id]?.map((photo: any) => (
                      <Box className={classes.photoCard}>
                        <PhotoCard
                          description={photo.description}
                          id={photo.id}
                          portfolio={photo.portfolio}
                          urls={photo.urls}
                          downloadAction={() =>
                            downloadPhoto(photo?.urls?.full)
                          }
                          favouriteAction={() => {
                            setSelectedPhoto(photo);
                            setIsModalOpen(true);
                          }}
                        />
                      </Box>
                    ))}
                    {!(favourites as any)?.[collection.id]?.length && (
                      <Typography variant="body1" component="p">
                        List is currently empty.
                      </Typography>
                    )}
                  </Box>
                </Box>
                <hr />
              </>
            )
          )}
        </Box>
      </MainLayout>
      <PhotoModal
        isOpen={isModalOpen}
        isFavouritePage={true}
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

export default Favourites;
