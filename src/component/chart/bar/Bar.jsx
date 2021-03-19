import { React, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { data } from 'component/chart/bar/BarData';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { BarMode } from 'component/chart/bar/BarMode';
import { BarLayout } from 'component/chart/bar/BarLayout';
import { BarReverse } from 'component/chart/bar/BarReverse';
import { BarMinValue } from 'component/chart/bar/BarMinValue';
import { BarMaxValue } from 'component/chart/bar/BarMaxValue';
import { BarMinMaxValue } from 'component/chart/bar/BarMinMaxValue';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 300,
    width: '100%',
  },
  item: {
    width: '100%',
  },
}));

const Bar = () => {
  const classes = useStyles();
  const [mode, setMode] = useState();
  const [laout, setlaout] = useState();
  const [reverse, setReverse] = useState();
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();

  /**
   * GroupMode
   */
  function getGroupMode(value) {
    return setMode(value);
  }

  const barMode = {
    groupMode: mode,
  };

  /**
   * Layout
   */
  function getLayout(value) {
    return setlaout(value);
  }

  const barLaout = {
    layout: laout,
  };

  /**
   * Reverse
   */
  function getReverse(value) {
    return setReverse(value);
  }

  const barReverse = {
    reverse: reverse,
  };

  /**
   * MinValue
   */
  function getMinValue(value) {
    return setMinValue(value);
  }

  const barMinValue = {
    minValue: minValue,
  };

  /**
   * MaxValue
   */
  function getMaxValue(value) {
    return setMaxValue(value);
  }

  const barMaxValue = {
    maxValue: maxValue,
  };

  const MyResponsiveBar = ({ data /* see data tab */ }) => (
    <ResponsiveBar
      data={data}
      keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      {...barMode}
      {...barLaout}
      {...barReverse}
      {...barMinValue}
      {...barMaxValue}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'fries',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'sandwich',
          },
          id: 'lines',
        },
      ]}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'food',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item className={classes.item}>
              <Paper className={classes.paper}>
                {MyResponsiveBar({ data })}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <BarMode getGroupMode={getGroupMode} />
      <br></br>
      <BarLayout getLayout={getLayout} />
      <br></br>
      <BarReverse getReverse={getReverse} />
      <br></br>
      <BarMinValue getMinValue={getMinValue} />
      <br></br>
      <BarMaxValue getMaxValue={getMaxValue} />
      <br></br>
      <BarMinMaxValue />
    </>
  );
};

export default Bar;
