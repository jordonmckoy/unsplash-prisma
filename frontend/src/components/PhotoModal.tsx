import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { CollectionType } from "../types";

type Props = {
  handleAddToList: (args?: any) => void;
  handleClose: () => void;
  handleRemoveFromList?: (args?: any) => void;
  handleSubmitList: (args?: any) => void;
  handleUpdateList?: (args?: any) => void;
  isFavouritePage?: boolean;
  isOpen: boolean;
  collections: CollectionType[];
  photo: any;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    form: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
      display: "flex",
      flexDirection: "column",
    },
    column: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

const PhotoModal = ({
  handleAddToList,
  handleClose,
  handleRemoveFromList,
  handleSubmitList,
  handleUpdateList,
  isFavouritePage,
  isOpen,
  collections,
  photo,
}: Props) => {
  const classes = useStyles();
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");

  const selectedCollectionId = isFavouritePage
    ? photo?.imageCollectionId
    : photo?.collectionId;
  const selectedDbId = isFavouritePage
    ? photo?.id
    : photo?.collectionId && photo?.dbId;

  return (
    <div>
      <Modal
        aria-labelledby="photo-modal"
        aria-describedby={photo.description}
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <>
            <div className={classes.paper}>
              <Typography variant="h3" component="h3">
                Lists
              </Typography>
              <Typography variant="subtitle1" component="p">
                {photo.collectionId
                  ? "Switch the current list."
                  : "Add photo to an existing list."}
              </Typography>
              <br />
              {!collections.length && (
                <>
                  <Typography variant="body2" component="p">
                    There are no existing lists!
                  </Typography>
                  <Typography variant="body2" component="p">
                    Create one below!
                  </Typography>
                </>
              )}
              <Box className={classes.column}>
                {collections.map((collection: any, key: number) => (
                  <Button
                    key={`collection_name_${key}`}
                    onClick={() => {
                      if (!selectedCollectionId) {
                        handleAddToList({
                          collectionId: collection?.id,
                          image: photo,
                        });
                      } else if (selectedCollectionId === collection?.id) {
                        handleRemoveFromList &&
                          handleRemoveFromList({
                            id: selectedDbId,
                          });
                      } else {
                        handleUpdateList &&
                          handleUpdateList({
                            collectionId: collection?.id,
                            id: selectedDbId,
                          });
                      }
                      handleClose();
                    }}
                    variant={
                      selectedCollectionId === collection?.id
                        ? "contained"
                        : "outlined"
                    }
                  >
                    {collection?.name}
                  </Button>
                ))}
              </Box>
              <hr />
              <form className={classes.form} noValidate autoComplete="off">
                <TextField
                  id="name"
                  label="Name"
                  onChange={(e) => setCollectionName(e.target.value)}
                />
                <TextField
                  id="description"
                  label="Description"
                  onChange={(e) => setCollectionDescription(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmitList({
                      collectionId: selectedCollectionId,
                      name: collectionName,
                      description: collectionDescription,
                      image: photo,
                    });
                    handleClose();
                  }}
                  type="button"
                >
                  Create List
                </Button>
              </form>
            </div>
          </>
        </Fade>
      </Modal>
    </div>
  );
};

export default PhotoModal;
