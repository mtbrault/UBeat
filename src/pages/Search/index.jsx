import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import groupBy from 'lodash/groupBy';
import Grid from '@material-ui/core/Grid';
import { getSearch } from '../../store/actions';
import LoaderLottie from '../../components/LoaderLottie';
import AlbumCard from '../../components/AlbumCard';
import ArtistCard from '../../components/ArtistCard';
import UserCard from "../User/UserCard";

export default ({ location: { search } }) => {
  const { q, limit } = queryString.parse(search);
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState({
    collection: [],
    artist: [],
    track: [],
    user: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(getSearch(q, limit)).then((res) => {
      setSearchResult({
        collection: [],
        artist: [],
        track: [],
        user: [],
        ...groupBy(res, 'wrapperType')
      });
      setLoading(false);
    });
  }, [q, limit, dispatch]);
  if (loading) {
    return (
      <LoaderLottie />
    );
  }
  return (
    <div>
      <h1>
        Page de résultats pour
        {' '}
        {`"${q}":`}
      </h1>
      <h1>
        Artists
        {`(${searchResult.artist.length})`}
      </h1>
      <Grid
        // className={classes.gridContainer}
        container
        spacing={3}
      >
        {searchResult.artist.map((artist, index) => (
          <Grid key={+index} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <ArtistCard artist={artist} />
          </Grid>
        ))}
      </Grid>
      <h1>
        Albums
        {`(${searchResult.collection.length})`}
      </h1>
      <Grid
        // className={classes.gridContainer}
        container
        spacing={3}
      >
        {searchResult.collection.map((album, index) => (
          <Grid key={+index} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <AlbumCard album={album} index={index} />
          </Grid>
        ))}
      </Grid>
      <h1>
        Tracks
        {`(${searchResult.track.length})`}
      </h1>
      <Grid
        // className={classes.gridContainer}
        container
        spacing={3}
      >
        {searchResult.track.map((album, index) => (
          <Grid key={+index} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <AlbumCard album={album} index={index} />
          </Grid>
        ))}
      </Grid>
      <h1>
        Users
        {`(${searchResult.user.length})`}
      </h1>
      <Grid
        // className={classes.gridContainer}
        container
        spacing={3}
      >
        {searchResult.user.map((user, index) => (
          <Grid key={+index} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <UserCard userFollowed={user} index={index} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
