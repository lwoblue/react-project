import { React, useState } from 'react';
import {
  makeStyles,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  BarAxisEnable,
  BarAxisTickSize,
  BarAxisTickPadding,
} from 'component/chart/bar/BarController';

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
  cJVylD: {
    fill: 'rgb(226, 93, 71)',
  },
  kQKPIi: {
    stroke: 'rgb(226, 93, 71)',
  },
  bEYNVl: {
    fill: 'rgb(247, 250, 251)',
    stroke: 'rgb(221, 221, 221)',
  },
}));

export default function BarAxis(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

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

  const getTickSize = (value) => {
    if (expanded === 'axisTop') {
      setAxisTop({ ...axisTop, tickSize: value });
      if (axisTopState === true) {
        props.getAxisTop({ ...axisTop, tickSize: value });
      } else {
        props.getAxisTop(null);
      }
    } else if (expanded === 'axisRight') {
      setAxisRight({ ...axisRight, tickSize: value });
      if (axisRightState === true) {
        props.getAxisRight({ ...axisRight, tickSize: value });
      } else {
        props.getAxisRight(null);
      }
    } else if (expanded === 'axisLeft') {
      setAxisLeft({ ...axisLeft, tickSize: value });
      if (axisLeftState === true) {
        props.getAxisLeft({ ...axisLeft, tickSize: value });
      } else {
        props.getAxisLeft(null);
      }
    } else if (expanded === 'axisBottom') {
      setAxisBottom({ ...axisBottom, tickSize: value });
      if (axisBottomState === true) {
        props.getAxisBottom({ ...axisBottom, tickSize: value });
      } else {
        props.getAxisBottom(null);
      }
    }
  };

  const getAxisTickPadding = (value) => {
    if (expanded === 'axisTop') {
      setAxisTop({ ...axisTop, tickPadding: value });
      if (axisTopState === true) {
        props.getAxisTop({ ...axisTop, tickPadding: value });
      } else {
        props.getAxisTop(null);
      }
    } else if (expanded === 'axisRight') {
      setAxisRight({ ...axisRight, tickPadding: value });
      if (axisRightState === true) {
        props.getAxisRight({ ...axisRight, tickPadding: value });
      } else {
        props.getAxisRight(null);
      }
    } else if (expanded === 'axisLeft') {
      setAxisLeft({ ...axisLeft, tickPadding: value });
      if (axisTopState === true) {
        props.getAxisLeft({ ...axisLeft, tickPadding: value });
      } else {
        props.getAxisRight(null);
      }
    } else if (expanded === 'axisBottom') {
      setAxisBottom({ ...axisBottom, tickPadding: value });
      if (axisBottomState === true) {
        props.getAxisBottom({ ...axisBottom, tickPadding: value });
      } else {
        props.getAxisBottom(null);
      }
    }
  };

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
          <BarAxisEnable getAxisEnable={getAxisEnable} />
          <BarAxisTickSize getTickSize={getTickSize} />
          <BarAxisTickPadding getAxisTickPadding={getAxisTickPadding} />
          <svg width="36" height="36">
            <circle cx="18" cy="18" r="15" className={classes.bEYNVl}></circle>
            <g transform="translate(18,18)">
              <g transform="rotate(56)">
                <line y2="-15" className={classes.kQKPIi}></line>
                <circle r="1.5" className={classes.cJVylD}></circle>
                <circle cy="-15" r="3" className={classes.cJVylD}></circle>
              </g>
            </g>
          </svg>
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
          <BarAxisEnable getAxisEnable={getAxisEnable} />
          <BarAxisTickSize getTickSize={getTickSize} />
          <BarAxisTickPadding getAxisTickPadding={getAxisTickPadding} />
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
          <BarAxisEnable getAxisEnable={getAxisEnable} />
          <BarAxisTickSize getTickSize={getTickSize} />
          <BarAxisTickPadding getAxisTickPadding={getAxisTickPadding} />
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
          <BarAxisEnable getAxisEnable={getAxisEnable} />
          <BarAxisTickSize getTickSize={getTickSize} />
          <BarAxisTickPadding getAxisTickPadding={getAxisTickPadding} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
