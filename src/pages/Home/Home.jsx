import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import ArtistCard from '../../components/ArtistCard';
import { getDiscoverArtists, getDiscoverAlbums } from '../../store/actions';
import AlbumCard from '../../components/AlbumCard';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  appBar: {
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  gridContainer: {
    padding: theme.spacing(1),
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiscoverArtists());
    dispatch(getDiscoverAlbums());
  }, [dispatch]);
  const artists = useSelector(({
    artistReducers: {
      discoverArtists,
    },
  }) => discoverArtists);
  const albums = useSelector(({
    albumReducers: {
      discoverAlbums,
    },
  }) => discoverAlbums);
  return (
    <div className={classes.root}>
      <h1>Discover new artists</h1>
      <Grid
        className={classes.gridContainer}
        container
        spacing={3}
      >
        {artists.map((artist, index) => (
          <Grid key={+index} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <ArtistCard artist={artist} />
          </Grid>
        ))}
      </Grid>
      <h1>Discover some albums</h1>
      <Grid
        className={classes.gridContainer}
        container
        spacing={3}
      >
        {albums.map((album, index) => (
          <Grid key={+index} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <AlbumCard album={album} index={index} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
