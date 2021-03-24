import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { BarAxisEnable } from 'component/chart/bar/BarController';

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
}));

export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [axisTop, setAxisTop] = useState({
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'axisTop',
    legendOffset: -31,
    legendPosition: 'middle',
  });
  const [axisRight, setAxisRight] = useState({
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'axisRight',
    legendOffset: -31,
    legendPosition: 'middle',
  });

  const [axisBottom, setAxisBottom] = useState({
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'axisBottom',
    legendOffset: -31,
    legendPosition: 'middle',
  });

  const [axisLeft, setAxisLeft] = useState({
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'axisLeft',
    legendOffset: -31,
    legendPosition: 'middle',
  });

  const handleChange = (axis) => (event, isExpanded) => {
    setExpanded(isExpanded ? axis : false);
  };

  const getAxisEnable = (value) => {
    console.log('value :::: ' + value);
    console.log('expanded :::: ' + expanded);
    console.log('axisTop :::: ' + axisTop.toString());
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === 'axisTop'}
        onChange={handleChange('axisTop')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="axisTop-content"
          id="axisTop-header"
        >
          <Typography className={classes.heading}>axisTop</Typography>
          <Typography className={classes.secondaryHeading}>
            상단 축 구성
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BarAxisEnable getAxisEnable={getAxisEnable} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'axisRight'}
        onChange={handleChange('axisRight')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="axisRight-content"
          id="axisRight-header"
        >
          <Typography className={classes.heading}>axisRight</Typography>
          <Typography className={classes.secondaryHeading}>
            우축 축 구성
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BarAxisEnable getAxisEnable={getAxisEnable} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'axisLeft'}
        onChange={handleChange('axisLeft')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="axisLeft-content"
          id="axisLeft-header"
        >
          <Typography className={classes.heading}>axisLeft</Typography>
          <Typography className={classes.secondaryHeading}>
            좌측 축 구성
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BarAxisEnable getAxisEnable={getAxisEnable} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'axisBottom'}
        onChange={handleChange('axisBottom')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="axisBottom-content"
          id="axisBottom-header"
        >
          <Typography className={classes.heading}>axisBottom</Typography>
          <Typography className={classes.secondaryHeading}>
            하단 축 구성
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BarAxisEnable getAxisEnable={getAxisEnable} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
