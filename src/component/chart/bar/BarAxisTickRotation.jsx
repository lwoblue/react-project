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
    marginTop: '20px',
    marginBottom: '20px',
  },
  input: {
    width: 55,
  },
});

export default function BarAxisTickPadding(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.getAxisTickPadding(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    props.getAxisTickPadding(
      event.target.value === '' ? '' : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 50) {
      setValue(50);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        TickPadding
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs>
          <PrettoSlider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={50}
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
              step: 1,
              min: 0,
              max: 50,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
