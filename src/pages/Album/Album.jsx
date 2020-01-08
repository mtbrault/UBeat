import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Menu,
  MenuItem,
  Fab,
  CircularProgress,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { withSnackbar } from 'notistack';
import { getAlbumWithTracks, getUserPlayList, postTrackToPlaylist } from '../../store/actions/index';
import LoaderLottie from '../../components/LoaderLottie';
import AlbumTrackList from './AlbumTrackList';

const Album = ({ match: { params: { albumId } }, history, enqueueSnackbar }) => {
  const dispatch = useDispatch();
  const storeAuth = useSelector((store) => store.authReducers);
  const [trackToPostInPlaylist, setTrackToPostInPlaylist] = useState({
    tracks: [],
    isAll: false,
  });

  useEffect(() => {
    if (storeAuth.id) {
      dispatch(getUserPlayList(storeAuth.id));
    }
    dispatch(getAlbumWithTracks(albumId));
    window.scrollTo(0, 0);
  }, [dispatch, albumId, storeAuth.id]);

  const [album, requestError] = useSelector(({
    albumReducers: {
      albums,
      error,
    },
  }) => [albums[albumId], error]);

  const [myPlaylists, loading] = useSelector(({
    playlistsReducers: { userPlayLists: playlist, loading: loadingRequest },
  }) => [playlist, loadingRequest]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, trackIndex) => {
    setAnchorEl(event.currentTarget);
    if (trackIndex !== -1) {
      setTrackToPostInPlaylist({ tracks: [album.tracks.results[trackIndex]], isAll: false });
    } else {
      setTrackToPostInPlaylist({ tracks: album.tracks.results, isAll: true });
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const addTrackToPlaylist = (trackId) => {
    handleClose();
    dispatch(postTrackToPlaylist(trackId, trackToPostInPlaylist.tracks)).then((res) => {
      enqueueSnackbar(`Tracks has been successfully added to the playlist ${res[0].data.name}`, {
        variant: 'success',
        autoHideDuration: 3000,
      });
    }).catch((e) => {
      enqueueSnackbar(`${e.message}`, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    });
  };

  if (requestError) {
    history.goBack();
  }
  if (!album || !myPlaylists) {
    return (
      <LoaderLottie />
    );
  }
  const date = new Date(album.releaseDate);
  const url = album.artworkUrl60 ? album.artworkUrl60.replace('60x60', '400x400') : '../../assets/defaultImage.png';
  return (
    <Grid container>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 200,
            maxHeight: 300,
          },
        }}
      >
        {myPlaylists.length === 0 && (
          <MenuItem>
            No Playlist
          </MenuItem>
        )}
        {myPlaylists.map(({ name, id }) => (
          <MenuItem key={id} onClick={() => addTrackToPlaylist(id)}>
            {name}
          </MenuItem>
        ))}
      </Menu>
      <Grid style={{ textAlign: 'center' }} item xs={12} xl={6}>
        <img src={url} alt="alt" />
        <Typography gutterBottom variant="h3" component="h2">
          {album.artistName}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {album.collectionName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {date && `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${album.trackCount} tracks of ${album.primaryGenreName}`}
        </Typography>
        <br />
        <a href={album.collectionViewUrl} rel="noopener noreferrer" target="_blank">
          <img src={require('../../assets/itunes.svg')} alt="itunes" />
        </a>
        <br />
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          disabled={loading}
          onClick={(event) => handleClick(event, -1)}
        >
          {loading && trackToPostInPlaylist.isAll ? <CircularProgress /> : <AddIcon />}
          Add album to your playlists
        </Fab>
      </Grid>
      <Grid item xs={12} xl={6}>
        <AlbumTrackList
          tracks={album.tracks.results}
          loading={loading}
          handleClick={handleClick}
          trackToPostInPlaylist={trackToPostInPlaylist}
        />
      </Grid>
    </Grid>
  );
};


export default withSnackbar(Album);
