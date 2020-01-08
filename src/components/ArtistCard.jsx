import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/defaultImage.png';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cover: {
    width: 151,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const ArtistCard = ({ artist: { artistName, primaryGenreName, artistId } }) => {
  const classes = useStyles();

  return (
    <Link to={`/artist/${artistId}`} style={{ textDecoration: 'none' }}>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Artist
            </Typography>
            <Typography variant="h5" component="h2">
              {artistName}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {primaryGenreName}
            </Typography>
            <Typography variant="body2" component="p">
              {Math.floor(Math.random() * 10 + 1)}
              {' '}
              album(s)
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              size="small"
            >
              view artist
            </Button>
          </CardActions>
        </div>
        <CardMedia
          className={classes.cover}
          image={defaultImage}
          title="Live from space album cover"
        />
      </Card>
    </Link>
  );
};

export default ArtistCard;
