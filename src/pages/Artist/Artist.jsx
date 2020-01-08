import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import AlbumCard from '../../components/AlbumCard';
import { getArtistWithAlbums } from '../../store/actions/index';
import LoaderLottie from '../../components/LoaderLottie';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    textAlign: 'center',
  },
  artistName: {
    fontSize: 50,
    marginBottom: 'auto',
  },
  gridContainer: {
    padding: theme.spacing(1),
  },
}));


const Artist = ({ match: { params: { artistId } }, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistWithAlbums(artistId)).catch(() => history.goBack());
  }, [dispatch, artistId, history]);

  const artist = useSelector(({
    artistReducers: {
      artists,
    },
  }) => artists[artistId]);
  if (!artist) {
    return (
      <LoaderLottie />
    );
  }
  return (
    <div className={classes.mainContainer}>
      <div style={{ marginBottom: 50 }}>
        <h1 className={classes.artistName}>{artist.artistName}</h1>
        <h2>{artist.primaryGenreName}</h2>
        <a href={artist.artistLinkUrl} rel="noopener noreferrer" target="_blank">
          <img src={require('../../assets/itunes.svg')} alt="itunes" />
        </a>
      </div>
      <Grid className={classes.gridContainer} container spacing={3}>
        {artist.albums.results.map((album, index) => (
          <Grid key={+index} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <AlbumCard album={album} index={index} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Artist;
