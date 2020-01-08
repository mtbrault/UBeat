import React, { useState } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import AddIcon from '@material-ui/icons/Add';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import ReactPlayer from 'react-player';

const AlbumTrackList = ({
  tracks, loading, handleClick, trackToPostInPlaylist,
}) => {
  const [playerConfig, setPlayerConfig] = useState({
    url: null,
    playing: false,
  });
  return (
    <>
      <ReactPlayer
        hidden
        url={playerConfig.url}
        playing={playerConfig.playing}
        onEnded={() => setPlayerConfig({
          url: null,
          playing: false,
        })}
      />
      <List>
        {tracks.map(({
          trackName,
          trackPrice,
          currency,
          trackTimeMillis,
          previewUrl,
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
                        onClick={() => setPlayerConfig({ url: previewUrl, playing: true })}
                      >
                        <PlayArrowIcon disabled={!previewUrl} />
                      </IconButton>
                    )}
                </ListItemIcon>
                <ListItemIcon>
                  {loading
                    && !trackToPostInPlaylist.isAll
                    && trackName === trackToPostInPlaylist.tracks[0].trackName
                    ? <CircularProgress />
                    : (
                      <IconButton
                        aria-describedby="descriptionClose"
                        disabled={loading}
                        onClick={(event) => handleClick(event, index)}
                      >
                        <AddIcon />
                      </IconButton>
                    )}
                </ListItemIcon>
                <ListItemText primary={trackName} secondary={`${trackPrice} ${currency}`} />
                <ListItemSecondaryAction>
                  <ListItemText>
                    {trackTimeMin}
                    {':'}
                    {trackTimeSec < 10 ? `0${trackTimeSec}` : trackTimeSec}
                  </ListItemText>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </>
  );
};
export default AlbumTrackList;
