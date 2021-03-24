import { React, useState } from 'react';
import { makeStyles, Grid, Typography, Input } from '@material-ui/core';
import InputColor from 'react-input-color';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 80,
  },
});

export default function BarBorderColor(props) {
  const classes = useStyles();
  const [initial, setInitial] = useState('#000000');
  const [color, setColor] = useState('');

  const handleColor = ({ hex, rgba, r, g, b, a }) => {
    setColor(hex);
    setInitial(hex);
    props.getBorderColor(hex);
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        BorderColor
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs>
          <div>
            <InputColor
              initialValue={initial}
              onChange={handleColor}
              placement="right"
            />
          </div>
        </Grid>
        <Grid item>
          <Input className={classes.input} value={color} margin="dense" />
        </Grid>
      </Grid>
    </div>
  );
}
