import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import Gravatar from 'react-gravatar';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  userStyle: {
    fontWeight: 'bold',
    fontSize: 17,
    margin: 'auto',
  },
});

const UserInformation = () => {
  const { name, email } = useSelector((store) => store.authReducers);
  const classes = useStyles();

  return (
    <>
      <Gravatar style={{ borderRadius: 160, marginRight: 15 }} email={email} size={50} />
      <span className={classes.userStyle}>{name}</span>
    </>
  );
};

export default UserInformation;
