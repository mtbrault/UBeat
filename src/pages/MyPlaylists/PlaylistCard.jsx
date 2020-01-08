import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardMedia, CardContent, CardActionArea, Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/defaultImage.png';

const useStyles = makeStyles(() => ({
  card: {
    width: 340,
    margin: 'auto',
  },
  media: {
    height: 340,
  },
}));

const PlaylistCard = (
  {
    children,
    playlist: {
      tracks,
      owner,
      id,
    },
    index,
  },
) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      {children}
      <Link to={`/playlist/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={defaultImage}
            title={`Playlist ${index}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {`Created by ${owner.name}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${tracks.length} chanson${tracks.length > 1 ? 's' : ''}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default PlaylistCard;
