import React from 'react';
import {
  withStyles,
  makeStyles,
  Grid,
  Typography,
  Slider,
  Input,
} from '@material-ui/core';

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 55,
  },
});

export default function BarMinValue(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.getMinValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    props.getMinValue(
      event.target.value === '' ? '' : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (value < -1000) {
      setValue(-1000);
    } else if (value > 0) {
      setValue(0);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        MinValue
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs>
          <PrettoSlider
            value={typeof value === 'number' ? value : -1000}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            valueLabelDisplay="auto"
            min={-1000}
            max={0}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: -1000,
              max: 0,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
