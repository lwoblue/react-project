import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

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

export const BarMinMaxValue = (props) => {
  const classes = useStyles();
  const [maxValue, setMaxValue] = React.useState(800);

  const maxHandleSliderChange = (event, newValue) => {
    console.log('newValue :::: ' + newValue);
    setMaxValue(newValue);
    // props.getMaxValue(maxValue);
  };

  const maxHandleInputChange = (event) => {
    setMaxValue(event.target.value === '' ? '' : Number(event.target.value));
    // props.getMaxValue(maxValue);
  };

  const maxHandleBlur = () => {
    if (maxValue < 0) {
      setMaxValue(0);
    } else if (maxValue > 1000) {
      setMaxValue(100);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.margin} />
      <Typography gutterBottom>Tooltip value label</Typography>

      <Grid container spacing={3} alignItems="center">
        <Grid item xs>
          <Slider
            ValueLabelComponent={ValueLabelComponent}
            getAriaLabel={(index) =>
              index === 0 ? 'Minimum price' : 'Maximum price'
            }
            onChange={maxHandleSliderChange}
            defaultValue={[0, 800]}
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
};
