import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import UserInformation from '../components/UserInformation';
import logoUbeat from '../assets/logo.png';
import { logoutUser } from '../store/actions';

const drawerStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  img: {
    textAlign: 'center',
  },
}));

const LayoutDrawerContent = ({ history, handleDrawerClose }) => {
  const classes = drawerStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const logout = () => {
    Cookies.remove('token');
    dispatch(logoutUser());
    history.push('/login');
  };
  const { id } = useSelector((store) => store.authReducers);

  return (
    <>
      <div className={classes.drawerHeader}>
        <Link to="/">
          <img src={logoUbeat} title="ubeatLogo" alt="ubeatLogo" width="150" className={classes.img} />
        </Link>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={() => history.push(`/user/${id}`)} key="Profile">
          <UserInformation />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="Home" onClick={() => history.push('/')}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button key="Playlist" onClick={() => history.push('/playlist')}>
          <ListItemText primary="My Playlists" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="Logout" onClick={() => logout()}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );
};

export default withRouter(LayoutDrawerContent);
