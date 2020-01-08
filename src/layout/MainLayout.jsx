import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './Layout';
import Home from '../pages/Home/Home';
import Album from '../pages/Album/Album';
import Artist from '../pages/Artist/Artist';
import SearchedUser from '../pages/User/SearchedUser';
import Playlist from '../pages/MyPlaylists/Playlist';
import Divider from '../components/Divider';
import PlaylistTracks from '../pages/MyPlaylists/PlaylistTracks';
import Search from '../pages/Search';

const MainLayout = ({ enqueueSnackbar }) => (
  <Layout enqueueSnackbar={enqueueSnackbar}>
    <Divider />
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/artist/:artistId" component={Artist} />
      <Route exact path="/album/:albumId" component={Album} />
      <Route exact path="/user/:searchUserId" component={SearchedUser} />
      <Route exact path="/playlist" component={Playlist} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/playlist/:playlistId" component={PlaylistTracks} />
      <Route exact path="/" render={() => <Redirect to="/home" />} />
    </Switch>
  </Layout>

);

export default MainLayout;
