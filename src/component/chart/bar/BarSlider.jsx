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
    maxWidth: 500,
    marginTop: '20px',
    marginBottom: '20px',
  },
  input: {
    width: 55,
  },
});

export default function BarSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.info().default);

  let name = props.info().name;
  let step = props.info().step;
  let min = props.info().min;
  let max = props.info().max;
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.state(newValue, name);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    props.state(
      event.target.value === '' ? '' : Number(event.target.value),
      name
    );
  };

  const handleBlur = () => {
    if (value < min) {
      setValue(min);
    } else if (value > max) {
      setValue(max);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        {/* {name} */}
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs>
          <PrettoSlider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            valueLabelDisplay="auto"
            step={step}
            min={min}
            max={max}
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
              step: step,
              min: min,
              max: max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
