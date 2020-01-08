import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Button, CardHeader, IconButton, Fab, DialogContent, TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withSnackbar } from 'notistack';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import {
  getMyPlayList,
  deletePlaylist,
  createPlaylist,
  putPlaylist,
} from '../../store/actions/index';
import LoaderLottie from '../../components/LoaderLottie';
import PlaylistCard from './PlaylistCard';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    textAlign: 'center',
  },
  artistName: {
    fontSize: 50,
  },
  gridContainer: {
    padding: theme.spacing(1),
  },
}));


const MyPlaylists = ({ enqueueSnackbar }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);
  const [isModalCreateOpen, setModalCreateOpen] = useState(false);
  const [name, setName] = useState('');
  const { email, id } = useSelector((store) => store.authReducers);

  const [editedPlaylist, setEditedPlaylist] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(getMyPlayList(id));
    }
  }, [dispatch, id]);

  const editPlaylistName = () => {
    dispatch(putPlaylist(editedPlaylist.id, name)).then(() => {
      dispatch(getMyPlayList(id));
      setEditedPlaylist({});
      enqueueSnackbar('Successfully edited', {
        variant: 'success',
      });
    }).catch((e) => {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
    });
  };

  const handleClickOpen = (playlist) => {
    setPlaylistToDelete(playlist);
    setModalDeleteOpen(true);
  };

  const createNewPlaylist = () => {
    setModalCreateOpen(false);
    dispatch(createPlaylist(name, email)).then(() => {
      enqueueSnackbar('Successfully created', {
        variant: 'success',
      });
      dispatch(getMyPlayList(id));
    }).catch((e) => {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
    }).finally(() => {
      setName('');
    });
  };

  const confirmDeletePlaylist = () => {
    setModalDeleteOpen(false);
    dispatch(deletePlaylist(playlistToDelete.id)).then(() => {
      enqueueSnackbar('Successfully deleted', {
        variant: 'success',
      });
      dispatch(getMyPlayList(id));
    }).catch((e) => {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
    });
  };
  const myPlaylists = useSelector(({
    playlistsReducers: { myPlaylists: playlist },
  }) => playlist);
  if (!myPlaylists) {
    return (
      <LoaderLottie />
    );
  }
  return (
    <div className={classes.mainContainer}>
      <Dialog
        open={isModalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
      >
        <DialogTitle>
          {`Etes vous sur de vouloir supprimer ${playlistToDelete && playlistToDelete.name} ?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setModalDeleteOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={confirmDeletePlaylist} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isModalCreateOpen}
        onClose={() => setModalCreateOpen(false)}
      >
        <DialogTitle>
          Playlist name?
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalCreateOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={createNewPlaylist} color="primary" autoFocus disabled={name.length === 0}>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container>
        <Grid item xs={12} style={{ textAlign: 'left' }}>
          <Fab onClick={() => { setModalCreateOpen(true); setName(''); setEditedPlaylist({}); }} variant="extended" size="small" color="secondary">
            <AddIcon />
            Create a playlist
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <h1 className={classes.artistName}>
            My playlists
          </h1>
        </Grid>
      </Grid>
      <Grid className={classes.gridContainer} container spacing={3}>
        {myPlaylists.map((playlist, index) => (
          <Grid key={+index} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <PlaylistCard playlist={playlist} index={index}>
              <CardHeader
                action={(
                  <>
                    {editedPlaylist !== playlist
                      ? (
                        <>
                          <IconButton
                            onClick={() => {
                              setEditedPlaylist(playlist); setName(playlist.name);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleClickOpen(playlist)}>
                            <CloseIcon color="error" />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            disabled={name.length === 0 || name === playlist.name}
                            onClick={() => editPlaylistName()}
                          >
                            <CheckIcon />
                          </IconButton>
                          <IconButton onClick={() => setEditedPlaylist({})}>
                            <CloseIcon />
                          </IconButton>
                        </>
                      )}
                  </>
                )}
                title={editedPlaylist === playlist
                  ? (
                    <TextField
                      fullWidth
                      value={name}
                      onChange={({ target: { value } }) => setName(value)}
                    />
                  ) : (
                    playlist.name
                  )}
              />
            </PlaylistCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default withSnackbar(MyPlaylists);
