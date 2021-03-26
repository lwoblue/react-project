import { React } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import Bar from './chart/bar/Bar';
import AutoPlaySlick from './gallery/AutoPlaySlick';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Bar />
          <AutoPlaySlick />
        </Grid>
      </div>
    </>
  );
};

export default Home;
