import { React, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { data } from './BarData';
import { makeStyles, Grid, Paper, Typography } from '@material-ui/core';
import {
  BarMode,
  BarLayout,
  BarMinValue,
  BarMaxValue,
  BarPadding,
  BarInnerPadding,
  BarColors,
  BarReverse,
  BarMinMaxValue,
  BarBorderRadius,
  BarBorderWidth,
  BarBorderColor,
  BarLabelTextColor,
  BarEnableGridX,
  BarEnableGridY,
  BarAxis,
} from 'component/chart/bar/BarController';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 300,
    width: '100%',
  },
  item: {
    width: '55%',
    position: 'fixed',
    marginLeft: '370px',
  },
}));

const Bar = () => {
  const classes = useStyles();
  const [mode, setMode] = useState();
  const [laout, setlaout] = useState();
  const [reverse, setReverse] = useState();
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();
  const [minMaxValue, setminMaxValue] = useState([]);
  const [padding, setPadding] = useState();
  const [innerPadding, setInnerPadding] = useState();
  const [colors, setColors] = useState('nivo');
  const [borderRadius, setBorderRadius] = useState();
  const [borderWidth, setBorderWidth] = useState();
  const [borderColor, setBorderColor] = useState();
  const [labelTextColor, setLabelTextColor] = useState();
  const [enableGridX, setEnableGridX] = useState(true);
  const [enableGridY, setEnableGridY] = useState();

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

  /**
   * MinMaxValue
   */
  function getMinMaxValue(value) {
    return setminMaxValue(value);
  }

  const barMinMaxValue = {
    minValue: minMaxValue[0],
    maxValue: minMaxValue[1],
  };

  /**
   * Padding
   */
  function getPadding(value) {
    return setPadding(value);
  }

  const barPadding = {
    padding: padding,
  };

  /**
   * InnerPadding
   */
  function getInnerPadding(value) {
    return setInnerPadding(value);
  }

  const barInnerPadding = {
    innerPadding: innerPadding,
  };

  /**
   * Colors
   */
  function getColors(value) {
    return setColors(value);
  }

  const barColors = {
    scheme: colors,
  };

  /**
   * BorderRadius
   */
  function getBorderRadius(value) {
    return setBorderRadius(value);
  }

  const barBorderRadius = {
    borderRadius: borderRadius,
  };

  /**
   * BorderWidth
   */
  function getBorderWidth(value) {
    return setBorderWidth(value);
  }

  const barBorderWidth = {
    borderWidth: borderWidth,
  };

  /**
   * BorderColor
   */
  function getBorderColor(value) {
    return setBorderColor(value);
  }

  const barBorderColor = {
    borderColor: borderColor,
  };

  /**
   * LabelTextColor
   */
  function getLabelTextColor(value) {
    return setLabelTextColor(value);
  }

  const barLabelTextColor = {
    labelTextColor: labelTextColor,
  };

  /**
   * EnableGridX
   */
  function getEnableGridX(value) {
    return setEnableGridX(value);
  }

  const barEnableGridX = {
    enableGridX: enableGridX,
  };

  /**
   * EnableGridY
   */
  function getEnableGridY(value) {
    return setEnableGridY(value);
  }

  const barEnableGridY = {
    enableGridY: enableGridY,
  };

  const MyResponsiveBar = ({ data /* see data tab */ }) => (
    <ResponsiveBar
      data={data}
      keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      {...barMode}
      {...barLaout}
      {...barReverse}
      {...barMinValue}
      {...barMaxValue}
      {...barMinMaxValue}
      {...barPadding}
      {...barInnerPadding}
      colors={{ ...barColors }}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
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
      {...barBorderRadius}
      {...barBorderWidth}
      {...barBorderColor}
      // borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
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
      {...barLabelTextColor}
      {...barEnableGridX}
      {...barEnableGridY}
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
      <br></br>
      <Typography gutterBottom>BASE</Typography>
      <br></br>
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
      <BarMinMaxValue getMinMaxValue={getMinMaxValue} />
      <br></br>
      <BarPadding getPadding={getPadding} />
      <br></br>
      <BarInnerPadding getInnerPadding={getInnerPadding} />
      <br></br>
      <Typography gutterBottom>STYLE</Typography>
      <br></br>
      <BarColors getColors={getColors} />
      <br></br>
      <BarBorderRadius getBorderRadius={getBorderRadius} />
      <br></br>
      <BarBorderWidth getBorderWidth={getBorderWidth} />
      <br></br>
      <BarBorderColor getBorderColor={getBorderColor} />
      <br></br>
      <Typography gutterBottom>LABELS</Typography>
      <br></br>
      <BarLabelTextColor getLabelTextColor={getLabelTextColor} />
      <br></br>
      <Typography gutterBottom>GRID & AXES</Typography>
      <br></br>
      <BarEnableGridX getEnableGridX={getEnableGridX} />
      <br></br>
      <BarEnableGridY getEnableGridY={getEnableGridY} />
      <br></br>
      <br></br>
      <BarAxis />
      <br></br>
    </>
  );
};

export default Bar;
