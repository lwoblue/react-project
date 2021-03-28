import { React, useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Slider,
  Typography,
  Tooltip,
  Grid,
  Input,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  margin: {
    height: theme.spacing(3),
  },
  maxInput: {
    width: 55,
  },
  minInput: {
    width: 55,
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="bottom" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BarMinMaxValue(props) {
  const classes = useStyles();
  const [value, setValue] = useState([0, 800]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.getMinMaxValue(newValue);
  };

  const minHandleInputChange = (event) => {
    // setMinValue(event.target.value === '' ? '' : Number(event.target.value));
    if (event.target.value) {
      setValue([Number(event.target.value), value[1]]);
    }
    props.getMinMaxValue([Number(event.target.value), value[1]]);
  };

  const maxHandleInputChange = (event) => {
    // setMaxValue(event.target.value === '' ? '' : Number(event.target.value));
    if (event.target.value) {
      setValue([value[0], Number(event.target.value)]);
    }
    props.getMinMaxValue([value[0], Number(event.target.value)]);
  };

  const minHandleBlur = () => {
    if (value[0] < -1000) {
      setValue([-1000, value[1]]);
    } else if (value[0] > 0) {
      setValue([0, value[1]]);
    }
  };

  const maxHandleBlur = () => {
    if (value[1] < 0) {
      setValue([value[0], 0]);
    } else if (value[1] > 1000) {
      setValue([value[0], 1000]);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.margin} />
      <Typography gutterBottom>MinMaxValue</Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Input
            className={classes.minInput}
            value={value[0]}
            margin="dense"
            onChange={minHandleInputChange}
            onBlur={minHandleBlur}
            inputProps={{
              step: 10,
              min: -1000,
              max: 0,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
        <Grid item xs>
          <Slider
            ValueLabelComponent={ValueLabelComponent}
            getAriaLabel={(index) =>
              index === 0 ? 'Minimum price' : 'Maximum price'
            }
            onChange={handleSliderChange}
            value={value}
            min={-1000}
            max={1000}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.maxInput}
            value={value[1]}
            margin="dense"
            onChange={maxHandleInputChange}
            onBlur={maxHandleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 1000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>

      <div className={classes.margin} />
    </div>
  );
}
