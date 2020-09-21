import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { RawImageType } from "../types";

type Props = {
  downloadAction: () => void;
  favouriteAction: () => void;
  portfolio?: string;
} & RawImageType;

const useStyles = makeStyles({
  root: {
    height: 260,
    width: 345,
  },
  actionArea: {
    height: 215,
    overflowY: "scroll",
  },
  media: {
    height: 140,
  },
  mediaFull: {
    height: "100%",
  },
});

const MediaCard = ({
  description,
  downloadAction,
  favouriteAction,
  id,
  portfolio,
  urls,
}: Props) => {
  const classes = useStyles();
  const [isHover, setIsHover] = useState(false);

  return (
    <Card
      className={classes.root}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {!isHover && (
        <CardMedia
          className={classes.mediaFull}
          image={urls?.regular}
          title={`${id}`}
        />
      )}
      {isHover && (
        <>
          <CardActionArea className={classes.actionArea}>
            <Link href={portfolio}>
              <CardMedia
                className={classes.media}
                image={urls?.small}
                title={`${id}`}
              />
            </Link>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {description || "No description provided by user"}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={downloadAction}>
              Download
            </Button>
            <Button size="small" color="primary" onClick={favouriteAction}>
              Favourite
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default MediaCard;
