import React from 'react';
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
    width: 300 + theme.spacing(3) * 2,
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

export default function BarMinMaxValueBack(props) {
  const classes = useStyles();
  const [maxValue, setMaxValue] = React.useState(800);
  const [minValue, setMinValue] = React.useState(-1000);

  const handleSliderChange = (event, newValue) => {
    setMinValue(newValue[0]);
    setMaxValue(newValue[1]);
    // props.getMaxValue(maxValue);
  };

  const minHandleInputChange = (event) => {
    console.log('minHandleInputChange :::: ' + event.target.value);
    setMinValue(event.target.value === '' ? '' : Number(event.target.value));

    // props.getMaxValue(maxValue);
  };

  const maxHandleInputChange = (event) => {
    console.log('maxHandleInputChange :::: ' + event.target.value);
    setMaxValue(event.target.value === '' ? '' : Number(event.target.value));

    // props.getMaxValue(maxValue);
  };

  const minHandleBlur = () => {
    if (minValue < -1000) {
      setMinValue(-1000);
    } else if (minValue > 0) {
      setMinValue(0);
    }
  };

  const maxHandleBlur = () => {
    if (maxValue < 0) {
      setMaxValue(0);
    } else if (maxValue > 1000) {
      setMaxValue(1000);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.margin} />
      <Typography gutterBottom>Tooltip value label</Typography>

      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <Input
            className={classes.minInput}
            value={minValue}
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
            value={[minValue, maxValue]}
            min={-1000}
            max={1000}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.maxInput}
            value={maxValue}
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
