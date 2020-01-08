import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, CardActionArea, Typography,
} from '@material-ui/core';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  card: {
    width: 340,
    margin: 'auto',
  },
  media: {
    height: 340,
  },
}));

const UserCard = (
  {
    userFollowed: {
      id,
      email,
    },
  },
) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Link to={`/user/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardActionArea>
          <CardContent>
            <Gravatar email={email} size={200} />
            <Typography gutterBottom variant="h5" component="h2">
              {email}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default UserCard;
