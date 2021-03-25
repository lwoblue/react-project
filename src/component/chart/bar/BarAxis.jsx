import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Circle from 'react-circle';
import {
  makeStyles,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Tooltip,
  Slider,
  TextField,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { BarAxisEnable, BarSlider } from 'component/chart/bar/BarController';

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '350px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  db: {
    display: 'block',
  },
  borderSolid: {
    border: '1px solid rgb(0 0 0 / 15%)',
  },
  circleStyle: {
    width: '60%',
    marginLeft: '10px',
  },
  legendInput: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  mgt20: {
    marginTop: '20px',
  },
}));

export default function BarAxis(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [circle, setCircle] = useState({
    circleTop: 0,
    circleRight: 0,
    circleLeft: 0,
    circleBottom: 0,
  });

  const [textField, setTextField] = useState({
    legendTop: 'axisTop',
    legendRight: 'axisRight',
    legendLeft: 'axisLeft',
    legendBottom: 'axisBottom',
  });

  const [axisTopState, setAxisTopState] = useState(false);
  const [axisTop, setAxisTop] = useState({
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'axisTop',
    legendOffset: -31,
    legendPosition: 'middle',
  });

  const [axisRightState, setAxisRightState] = useState(false);
  const [axisRight, setAxisRight] = useState({
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'axisRight',
    legendOffset: -31,
    legendPosition: 'middle',
  });

  const [axisLeftState, setAxisLeftState] = useState(false);
  const [axisLeft, setAxisLeft] = useState({
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'axisLeft',
    legendOffset: -31,
    legendPosition: 'middle',
  });

  const [axisBottomState, setAxisBottomState] = useState(false);
  const [axisBottom, setAxisBottom] = useState({
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'axisBottom',
    legendOffset: -31,
    legendPosition: 'middle',
  });

  const handleChange = (axis) => (event, isExpanded) => {
    setExpanded(isExpanded ? axis : false);
  };

  const handleSliderChange = (event, newValue) => {
    if (expanded === 'axisTop') {
      setCircle({ ...circle, circleTop: newValue });
    } else if (expanded === 'axisRight') {
      setCircle({ ...circle, circleRight: newValue });
    } else if (expanded === 'axisLeft') {
      setCircle({ ...circle, circleLeft: newValue });
    } else if (expanded === 'axisBottom') {
      setCircle({ ...circle, circleBottom: newValue });
    }

    axisState(newValue, 'Circle');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleTextChange = (event) => {
    if (expanded === 'axisTop') {
      setTextField({ ...textField, legendTop: event.target.value });
    } else if (expanded === 'axisRight') {
      setTextField({ ...textField, legendRight: event.target.value });
    } else if (expanded === 'axisLeft') {
      setTextField({ ...textField, legendLeft: event.target.value });
    } else if (expanded === 'axisBottom') {
      setTextField({ ...textField, legendBottom: event.target.value });
    }

    axisState(event.target.value, 'TextField');
  };

  const getAxisEnable = (value) => {
    if (expanded === 'axisTop') {
      if (value === true) {
        setAxisTopState(true);
        props.getAxisTop(axisTop);
      } else {
        setAxisTopState(false);
        props.getAxisTop(null);
      }
    } else if (expanded === 'axisRight') {
      if (value === true) {
        setAxisRightState(true);
        props.getAxisRight(axisRight);
      } else {
        setAxisRightState(false);
        props.getAxisRight(null);
      }
    } else if (expanded === 'axisLeft') {
      if (value === true) {
        setAxisLeftState(true);
        props.getAxisLeft(axisLeft);
      } else {
        setAxisLeftState(false);
        props.getAxisLeft(null);
      }
    } else if (expanded === 'axisBottom') {
      if (value === true) {
        setAxisBottomState(true);
        props.getAxisBottom(axisBottom);
      } else {
        setAxisBottomState(false);
        props.getAxisBottom(null);
      }
    }
  };

  const getAxisTickSizeNum = () => {
    return { default: 2, name: 'TickSize', step: 1, min: 0, max: 50 };
  };

  const getAxisTickPaddingNum = () => {
    return { default: 2, name: 'TickPadding', step: 1, min: 0, max: 50 };
  };

  const axisState = (value, value2) => {
    switch (expanded) {
      case 'axisTop':
        if (value2 === 'TickSize') {
          setAxisTop({ ...axisTop, tickSize: value });
          if (axisTopState === true) {
            props.getAxisTop({ ...axisTop, tickSize: value });
          } else {
            props.getAxisTop(null);
          }
        } else if (value2 === 'TickPadding') {
          setAxisTop({ ...axisTop, tickPadding: value });
          if (axisTopState === true) {
            props.getAxisTop({ ...axisTop, tickPadding: value });
          } else {
            props.getAxisTop(null);
          }
        } else if (value2 === 'Circle') {
          setAxisTop({ ...axisTop, tickRotation: value });
          if (axisTopState === true) {
            props.getAxisTop({ ...axisTop, tickRotation: value });
          } else {
            props.getAxisTop(null);
          }
        } else if (value2 === 'TextField') {
          setAxisTop({ ...axisTop, legend: value });
          if (axisTopState === true) {
            props.getAxisTop({ ...axisTop, legend: value });
          } else {
            props.getAxisTop(null);
          }
        }
        break;
      case 'axisRight':
        if (value2 === 'TickSize') {
          setAxisRight({ ...axisRight, tickSize: value });
          if (axisRightState === true) {
            props.getAxisRight({ ...axisRight, tickSize: value });
          } else {
            props.getAxisRight(null);
          }
        } else if (value2 === 'TickPadding') {
          setAxisRight({ ...axisRight, tickPadding: value });
          if (axisRightState === true) {
            props.getAxisRight({ ...axisRight, tickPadding: value });
          } else {
            props.getAxisRight(null);
          }
        } else if (value2 === 'Circle') {
          setAxisRight({ ...axisRight, tickRotation: value });
          if (axisRightState === true) {
            props.getAxisRight({ ...axisRight, tickRotation: value });
          } else {
            props.getAxisRight(null);
          }
        } else if (value2 === 'TextField') {
          setAxisRight({ ...axisRight, legend: value });
          if (axisRightState === true) {
            props.getAxisRight({ ...axisRight, legend: value });
          } else {
            props.getAxisRight(null);
          }
        }
        break;
      case 'axisLeft':
        if (value2 === 'TickSize') {
          setAxisLeft({ ...axisLeft, tickSize: value });
          if (axisLeftState === true) {
            props.getAxisLeft({ ...axisLeft, tickSize: value });
          } else {
            props.getAxisLeft(null);
          }
        } else if (value2 === 'TickPadding') {
          setAxisLeft({ ...axisLeft, tickPadding: value });
          if (axisLeftState === true) {
            props.getAxisLeft({ ...axisLeft, tickPadding: value });
          } else {
            props.getAxisLeft(null);
          }
        } else if (value2 === 'Circle') {
          setAxisLeft({ ...axisLeft, tickRotation: value });
          if (axisLeftState === true) {
            props.getAxisLeft({ ...axisLeft, tickRotation: value });
          } else {
            props.getAxisLeft(null);
          }
        } else if (value2 === 'TextField') {
          setAxisLeft({ ...axisLeft, legend: value });
          if (axisLeftState === true) {
            props.getAxisLeft({ ...axisLeft, legend: value });
          } else {
            props.getAxisLeft(null);
          }
        }
        break;
      case 'axisBottom':
        if (value2 === 'TickSize') {
          setAxisBottom({ ...axisBottom, tickSize: value });
          if (axisBottomState === true) {
            props.getAxisBottom({ ...axisBottom, tickSize: value });
          } else {
            props.getAxisBottom(null);
          }
        } else if (value2 === 'TickPadding') {
          setAxisBottom({ ...axisBottom, tickPadding: value });
          if (axisBottomState === true) {
            props.getAxisBottom({ ...axisBottom, tickPadding: value });
          } else {
            props.getAxisBottom(null);
          }
        } else if (value2 === 'Circle') {
          setAxisBottom({ ...axisBottom, tickRotation: value });
          if (axisBottomState === true) {
            props.getAxisBottom({ ...axisBottom, tickRotation: value });
          } else {
            props.getAxisBottom(null);
          }
        } else if (value2 === 'TextField') {
          setAxisBottom({ ...axisBottom, legend: value });
          if (axisBottomState === true) {
            props.getAxisBottom({ ...axisBottom, legend: value });
          } else {
            props.getAxisBottom(null);
          }
        }
        break;
      default:
        break;
    }
  };

  function axisContents() {
    return (
      <>
        <BarAxisEnable getAxisEnable={getAxisEnable} />
        <BarSlider state={axisState} info={getAxisTickSizeNum} />
        <BarSlider state={axisState} info={getAxisTickPaddingNum} />
        <Typography id="input-slider" gutterBottom>
          Circle
        </Typography>
        <Circle
          animate={true} // Boolean: Animated/Static progress
          animationDuration="0.5s" // String: Length of animation
          responsive={false} // Boolean: Make SVG adapt to parent size
          size="100" // String: Defines the size of the circle.
          lineWidth="25" // String: Defines the thickness of the circle's stroke.
          progress={
            expanded === 'axisTop'
              ? circle.circleTop
              : expanded === 'axisRight'
              ? circle.circleRight
              : expanded === 'axisLeft'
              ? circle.circleLeft
              : circle.circleBottom
          } // String: Update to change the progress and percentage.
          progressColor="#e0b250" // String: Color of "progress" portion of circle.
          bgColor="#ebe7c4" // String: Color of "empty" portion of circle.
          textColor="#6b778c" // String: Color of percentage text color.
          textStyle={{
            font: 'bold 4rem Helvetica, Arial, sans-serif', // CSSProperties: Custom styling for percentage.
          }}
          percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
          roundedStroke={false} // Boolean: Rounded/Flat line ends
          showPercentage={true} // Boolean: Show/hide percentage.
          showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
        />
        <Slider
          className={classes.circleStyle}
          ValueLabelComponent={ValueLabelComponent}
          aria-label="custom thumb label"
          defaultValue={0}
          onChange={handleSliderChange}
          step={10}
          min={-100}
          max={100}
        />
        <form
          className={(classes.root, classes.mgt20)}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="legend"
            multiline
            rowsMax={4}
            value={
              expanded === 'axisTop'
                ? textField.legendTop
                : expanded === 'axisRight'
                ? textField.legendRight
                : expanded === 'axisLeft'
                ? textField.legendLeft
                : textField.legendBottom
            }
            onChange={handleTextChange}
            variant="outlined"
          />
        </form>
      </>
    );
  }

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === 'axisTop'}
        onChange={handleChange('axisTop')}
      >
        <AccordionSummary
          className={classes.borderSolid}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="axisTop-content"
          id="axisTop-header"
        >
          <Typography className={classes.heading}>axisTop</Typography>
          <Typography className={classes.secondaryHeading}>
            상단 축 구성
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.db}>
          {axisContents()}
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'axisRight'}
        onChange={handleChange('axisRight')}
      >
        <AccordionSummary
          className={classes.borderSolid}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="axisRight-content"
          id="axisRight-header"
        >
          <Typography className={classes.heading}>axisRight</Typography>
          <Typography className={classes.secondaryHeading}>
            우축 축 구성
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.db}>
          {axisContents()}
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'axisLeft'}
        onChange={handleChange('axisLeft')}
      >
        <AccordionSummary
          className={classes.borderSolid}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="axisLeft-content"
          id="axisLeft-header"
        >
          <Typography className={classes.heading}>axisLeft</Typography>
          <Typography className={classes.secondaryHeading}>
            좌측 축 구성
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.db}>
          {axisContents()}
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'axisBottom'}
        onChange={handleChange('axisBottom')}
      >
        <AccordionSummary
          className={classes.borderSolid}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="axisBottom-content"
          id="axisBottom-header"
        >
          <Typography className={classes.heading}>axisBottom</Typography>
          <Typography className={classes.secondaryHeading}>
            하단 축 구성
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.db}>
          {axisContents()}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
