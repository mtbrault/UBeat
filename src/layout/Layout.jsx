import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import UserInformation from '../components/UserInformation';
import LayoutDrawerContent from './LayoutDrawerContent';
import LayoutStyles from './LayoutStyles';
import { tokenInfo, getSearch } from '../store/actions';


const Layout = ({ children, history, enqueueSnackbar }) => {
  const classes = LayoutStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) { history.push('/login'); }
    dispatch(tokenInfo(token)).catch(() => {
      Cookies.remove('token');
      history.push('/login');
    });
    setOpen(matches);
  }, [matches, dispatch, history]);

  const { error } = useSelector((store) => store.authReducers);

  useEffect(() => {
    if (error) {
      Cookies.remove('token');
      history.push('/login');
    }
  }, [error, history]);

  const [options, handleSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Autocomplete
            id="search"
            value={null}
            open={autoCompleteOpen}
            options={options.sort((a, b) => a.wrapperType.localeCompare(b.wrapperType))}
            groupBy={(option) => option.wrapperType}
            onClose={() => setAutoCompleteOpen(false)}
            onOpen={() => setAutoCompleteOpen(true)}
            getOptionLabel={({
              artistName, collectionName, trackName, wrapperType, email,
            }) => {
              switch (wrapperType) {
                case 'track':
                  return trackName;
                case 'collection':
                  return collectionName;
                case 'artist':
                  return artistName;
                case 'user':
                  return email;
                default:
                  return 'unknow';
              }
            }}
            onChange={(_e, value) => {
              setAutoCompleteOpen(false);
              if (value == null) {
                return;
              }
              const {
                wrapperType, artistId, collectionId, id,
              } = value;
              switch (wrapperType) {
                case 'track':
                  history.push(`/album/${collectionId}`);
                  break;
                case 'collection':
                  history.push(`/album/${collectionId}`);
                  break;
                case 'artist':
                  history.push(`/artist/${artistId}`);
                  break;
                case 'user':
                  history.push(`/user/${id}`);
                  break;
                default:
                  break;
              }
            }}
            loading={loading}
            loadingText="chargement..."
            renderInput={({
              InputProps, inputProps, InputLabelProps, id,
            }) => (
                <div className={classes.search}>
                  <TextField
                    id={id}
                    onKeyPress={(ev) => {
                      if (ev.key === 'Enter') {
                        setAutoCompleteOpen(false);
                        if (ev.target.value === '') {
                          return;
                        }
                        history.push(`/search?q=${ev.target.value}&limit=10`);
                        ev.preventDefault();
                      } else {
                        setLoading(true);
                        dispatch(getSearch(ev.target.value + ev.key, 10))
                          .then((result) => {
                            setAutoCompleteOpen(true);
                            handleSearch(result);
                          })
                          .catch(() => {
                            enqueueSnackbar('Failed to search', {
                              variant: 'error',
                            });
                          })
                          .finally(() => {
                            setLoading(false);
                          });
                      }
                    }}
                    inputProps={inputProps}
                    InputProps={{
                      ...InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon style={{ margin: 5, color: 'white' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <>
                          {loading && <CircularProgress color="inherit" size={20} />}
                          {InputProps.endAdornment}
                        </>
                      ),
                    }}
                    InputLabelProps={InputLabelProps}
                    style={{ minWidth: 300 }}
                    fullWidth
                    placeholder="Search…"
                  />
                </div>
              )}
          />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <UserInformation />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <LayoutDrawerContent handleDrawerClose={handleDrawerClose} />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

export default withRouter(Layout);
