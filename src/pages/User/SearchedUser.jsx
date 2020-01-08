import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Gravatar from 'react-gravatar';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Menu,
  MenuItem,
  Button,
  CardHeader,
} from '@material-ui/core';
import { withSnackbar } from 'notistack';
import {
  getUserById, followUserById, unFollowUserById, getUserPlayList,
} from '../../store/actions/index';
import LoaderLottie from '../../components/LoaderLottie';
import PlaylistCard from '../MyPlaylists/PlaylistCard';
import UserCard from './UserCard';


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

const SearchedUser = ({ match: { params: { searchUserId } }, enqueueSnackbar, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { searchedUser, error } = useSelector((store) => store.userReducers);
  const { following } = useSelector((store) => store.authReducers);
  const [isFollowing, setIsFollowing] = useState(following.some((e) => (e.id === searchUserId)));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getUserPlayList(searchUserId));
    dispatch(getUserById(searchUserId));
  }, [dispatch, searchUserId]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar('User not found, Redirected to home', {
        variant: 'error',
      });
      history.push('/home');
    }
  }, [error, enqueueSnackbar, history]);


  useEffect(() => {
    setIsFollowing(following.some((e) => (e.id === searchUserId)));
  }, [following, searchUserId]);

  const followUser = () => {
    dispatch(followUserById(searchUserId)).then(() => {
      enqueueSnackbar('Le following a été un succès', {
        variant: 'success',
      });
    }).catch((e) => {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
    });
  };

  const unFollowUser = () => {
    dispatch(unFollowUserById(searchUserId)).then(() => {
      enqueueSnackbar("L'unfollowing a été un succès", {
        variant: 'success',
      });
    }).catch((e) => {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userPlayLists = useSelector(({
    playlistsReducers: { userPlayLists: playlist },
  }) => playlist);
  if (!searchedUser) {
    return (
      <LoaderLottie />
    );
  }
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
        <MenuItem>
          No Playlist
        </MenuItem>
      </Menu>
      <Grid style={{ textAlign: 'center' }} item xs={12}>
        <Gravatar style={{ borderRadius: 160 }} email={searchedUser.email} size={200} />
        <Typography gutterBottom variant="h3" component="h2">
          {searchedUser.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {searchedUser.email}
        </Typography>
        {isFollowing ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => unFollowUser()}
          >
            unFollow
          </Button>
        ) : (
          <Button
              variant="contained"
              color="primary"
              onClick={() => followUser()}
            >
              Follow
            </Button>
        )}
        <Grid container>
          <Grid item xs={12}>
            <h1 className={classes.artistName}>
              Playlists (
              {userPlayLists.length}
              )
            </h1>
          </Grid>
        </Grid>
        <Grid className={classes.gridContainer} container spacing={3}>
          {userPlayLists.map((playlist, index) => (
            <Grid key={+index} item xs={12} sm={12} md={6} lg={4} xl={3}>
              <PlaylistCard playlist={playlist} index={index}>
                <CardHeader
                  title={playlist.name}
                />
              </PlaylistCard>
            </Grid>
          ))}
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <h1 className={classes.artistName}>
              Friends (
              {searchedUser.following.length}
              )
            </h1>
          </Grid>
        </Grid>
        <Grid className={classes.gridContainer} container spacing={3}>
          {searchedUser.following.map((userFollowed, index) => (
            <Grid key={+index} item xs={12} sm={12} md={6} lg={4} xl={3}>
              <UserCard userFollowed={userFollowed} index={index} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};


export default withSnackbar(SearchedUser);
