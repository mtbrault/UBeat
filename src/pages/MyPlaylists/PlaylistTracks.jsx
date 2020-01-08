import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
  Typography,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ReactPlayer from 'react-player';
import { withSnackbar } from 'notistack';
import DeleteIcon from '@material-ui/icons/Delete';
import { getPlaylistById, deleteTrackOfPlaylist, postTrackToPlaylist } from '../../store/actions/index';
import LoaderLottie from '../../components/LoaderLottie';

const PlaylistTracks = ({
  match: { params: { playlistId } },
  enqueueSnackbar,
  closeSnackbar,
  history,
}) => {
  const dispatch = useDispatch();
  const [playerConfig, setPlayerConfig] = useState({
    url: null,
    playing: false,
  });
  useEffect(() => {
    dispatch(getPlaylistById(playlistId)).catch(() => history.goBack());
    window.scrollTo(0, 0);
  }, [dispatch, playlistId, history]);

  const playlist = useSelector(({
    playlistsReducers: { playlists },
  }) => playlists[playlistId]);

  const deleteTrack = (track) => {
    dispatch(deleteTrackOfPlaylist(playlistId, track.trackId)).then(() => {
      enqueueSnackbar('La chanson a bien été supprimé', {
        variant: 'success',
        action: (key) => (
          <>
            <Button
              onClick={() => {
                dispatch(postTrackToPlaylist(playlistId, [track])).then(() => {
                  dispatch(getPlaylistById(playlistId));
                });
                closeSnackbar(key);
              }}
            >
              Annuler
            </Button>
            <IconButton onClick={() => closeSnackbar(key)}>
              <CloseIcon />
            </IconButton>
          </>
        ),
      });
    }).catch((e) => {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
    });
  };
  if (!playlist) {
    return (
      <LoaderLottie />
    );
  }
  return (
    <Grid container>
      <ReactPlayer
        hidden
        url={playerConfig.url}
        playing={playerConfig.playing}
        onEnded={() => setPlayerConfig({
          url: null,
          playing: false,
        })}
      />
      <Grid style={{ textAlign: 'center' }} item xs={12}>
        <Typography gutterBottom variant="h3" component="h2">
          {playlist.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${playlist.tracks.length} chansons`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List>
          {playlist.tracks.map(({
            trackName,
            trackPrice,
            currency,
            trackTimeMillis,
            previewUrl,
            trackId,
            ...track
          }, index) => {
            const trackTimeMin = Math.floor(trackTimeMillis / 60000).toString();
            const trackTimeSec = Math.floor(trackTimeMillis % (60000 / 1000)).toString();

            return (
              <div key={+index}>
                <ListItem>
                  <Typography style={{ width: '20px' }}>
                    {index + 1}
                  </Typography>
                  <ListItemIcon>
                    {previewUrl === playerConfig.url && playerConfig.playing ? (
                      <IconButton onClick={() => setPlayerConfig({ playing: false })}>
                        <PauseIcon />
                      </IconButton>
                    )
                      : (
                        <IconButton
                          disabled={!previewUrl}
                          onClick={() => setPlayerConfig({ url: previewUrl, playing: true })}
                        >
                          <PlayArrowIcon />
                        </IconButton>
                      )}
                  </ListItemIcon>
                  <ListItemText primary={trackName} secondary={trackPrice && `${trackPrice} ${currency}`} />
                  <ListItemIcon>
                    <IconButton
                      onClick={() => deleteTrack({
                        ...track,
                        trackName,
                        trackPrice,
                        currency,
                        trackTimeMillis,
                        previewUrl,
                        trackId,
                      })}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemSecondaryAction>
                    <ListItemText>
                      {trackTimeMillis && `${trackTimeMin}:${trackTimeSec < 10 ? `0${trackTimeSec}` : trackTimeSec}`}
                    </ListItemText>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};


export default withSnackbar(PlaylistTracks);
