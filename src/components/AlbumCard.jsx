import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardMedia, CardContent, CardActionArea, Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/defaultImage.png';

const useStyles = makeStyles(() => ({
  card: {
    width: 340,
    margin: 'auto',
  },
  media: {
    height: 340,
  },
}));

const AlbumCard = (
  {
    album: {
      releaseDate,
      artworkUrl60,
      collectionName,
      collectionPrice,
      currency,
      collectionId,
    },
    index,
  },
) => {
  const classes = useStyles();
  const url = artworkUrl60 ? artworkUrl60.replace('60x60', '400x400') : defaultImage;
  const date = releaseDate ? new Date(releaseDate).getFullYear() : 'unknown';
  return (
    <Link to={`/album/${collectionId}`} style={{ textDecoration: 'none' }}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={url}
            title={`Album ${index}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {collectionName}
            </Typography>
            <Typography variant="h6" component="h5">
              {collectionPrice}
              {' '}
              {currency}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {date}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default AlbumCard;
