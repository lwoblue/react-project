import { React, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { data } from './BarData';
import {
  makeStyles,
  Grid,
  Paper,
  Divider,
  SnackbarContent,
  Box,
} from '@material-ui/core';
import {
  BarSwitch,
  BarSlider,
  BarMinMaxValue,
  BarColors,
  BarColorInput,
  BarAxis,
} from 'component/chart/bar/BarController';
import AutoPlaySlick from 'component/gallery/AutoPlaySlick';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 300,
    width: '100%',
    overflow: 'auto',
  },
  item: {
    width: '55%',
    position: 'fixed',
    marginLeft: '370px',
  },
  snackbarContent: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  snackbarRoot: {
    color: '#fcc600',
    backgroundColor: '#000000b8',
    minWidth: 'auto',
    width: '100%',
  },
  mgTB: {
    marginTop: '15px',
    marginBottom: '15px',
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
  const [axisTop, setAxisTop] = useState(null);
  const [axisRight, setAxisRight] = useState(null);
  const [axisLeft, setAxisLeft] = useState(null);
  const [axisBottom, setAxisBottom] = useState(null);

  /**
   * Switch
   */
  function switchState(value, value2) {
    switch (value2) {
      case 'GroupMode':
        setMode(value);
        break;
      case 'Layout':
        setlaout(value);
        break;
      case 'Reverse':
        setReverse(value);
        break;
      case 'EnableGridX':
        setEnableGridX(value);
        break;
      case 'EnableGridY':
        setEnableGridY(value);
        break;
      default:
        break;
    }
  }

  /**
   * GroupMode
   */

  const groupModeInfo = () => {
    return {
      default: 'grouped',
      name: 'GroupMode',
      valueTrue: 'grouped',
      valueFalse: 'stacked',
    };
  };

  const barMode = {
    groupMode: mode,
  };

  /**
   * Layout
   */

  const layoutInfo = () => {
    return {
      default: 'horizontal',
      name: 'Layout',
      valueTrue: 'horizontal',
      valueFalse: 'vertical',
    };
  };

  const barLaout = {
    layout: laout,
  };

  /**
   * Reverse
   */

  const reverseInfo = () => {
    return {
      default: true,
      name: 'Reverse',
      valueTrue: true,
      valueFalse: false,
    };
  };

  const barReverse = {
    reverse: reverse,
  };

  /**
   * Slider
   */
  function sliderState(value, value2) {
    switch (value2) {
      case 'MinValue':
        setMinValue(value);
        break;
      case 'MaxValue':
        setMaxValue(value);
        break;
      case 'Padding':
        setPadding(value);
        break;
      case 'InnerPadding':
        setInnerPadding(value);
        break;
      case 'BorderRadius':
        setBorderRadius(value);
        break;
      case 'BorderWidth':
        setBorderWidth(value);
        break;

      default:
        break;
    }
  }

  /**
   * MinValue
   */

  const getMinValueNum = () => {
    return { default: 0, name: 'MinValue', step: 10, min: -1000, max: 0 };
  };

  const barMinValue = {
    minValue: minValue,
  };

  /**
   * MaxValue
   */

  const getMaxValueNum = () => {
    return { default: 800, name: 'MaxValue', step: 10, min: 0, max: 1000 };
  };

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

  const getPaddingNum = () => {
    return { default: 0.3, name: 'Padding', step: 0.1, min: 0, max: 0.9 };
  };

  const barPadding = {
    padding: padding,
  };

  /**
   * InnerPadding
   */

  const getInnerPaddingNum = () => {
    return { default: 0, name: 'InnerPadding', step: 1, min: 0, max: 10 };
  };

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
  const getBorderRadiusNum = () => {
    return { default: 0, name: 'BorderRadius', step: 1, min: 0, max: 100 };
  };

  const barBorderRadius = {
    borderRadius: borderRadius,
  };

  /**
   * BorderWidth
   */

  const getBorderWidthNum = () => {
    return { default: 0, name: 'BorderWidth', step: 1, min: 0, max: 20 };
  };

  const barBorderWidth = {
    borderWidth: borderWidth,
  };

  /**
   * ColorInput
   */
  function colorInputState(value, value2) {
    switch (value2) {
      case 'BorderColor':
        setBorderColor(value);
        break;
      case 'LabelTextColor':
        setLabelTextColor(value);
        break;
      default:
        break;
    }
  }

  /**
   * BorderColor
   */

  const getBorderColorNum = () => {
    return { default: '#000000', name: 'BorderColor' };
  };

  const barBorderColor = {
    borderColor: borderColor,
  };

  /**
   * LabelTextColor
   */
  const getLabelTextColorNum = () => {
    return { default: '#000000', name: 'LabelTextColor' };
  };

  const barLabelTextColor = {
    labelTextColor: labelTextColor,
  };

  /**
   * EnableGridX
   */
  const EnableGridXInfo = () => {
    return {
      default: false,
      name: 'EnableGridX',
      valueTrue: false,
      valueFalse: true,
    };
  };

  const barEnableGridX = {
    enableGridX: enableGridX,
  };

  /**
   * EnableGridY
   */

  const EnableGridYInfo = () => {
    return {
      default: false,
      name: 'EnableGridY',
      valueTrue: false,
      valueFalse: true,
    };
  };

  const barEnableGridY = {
    enableGridY: enableGridY,
  };

  /**
   * AxisTop
   */
  function getAxisTop(value) {
    return setAxisTop(value);
  }

  const barAxisTop = {
    axisTop: axisTop,
  };

  /**
   * AxisRight
   */
  function getAxisRight(value) {
    return setAxisRight(value);
  }

  const barAxisRight = {
    axisRight: axisRight,
  };

  /**
   * AxisLeft
   */
  function getAxisLeft(value) {
    return setAxisLeft(value);
  }

  const barAxisLeft = {
    axisLeft: axisLeft,
  };

  /**
   * AxisBottom
   */
  function getAxisBottom(value) {
    return setAxisBottom(value);
  }

  const barAxisBottom = {
    axisBottom: axisBottom,
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
      {...barAxisTop}
      {...barAxisRight}
      {...barAxisLeft}
      {...barAxisBottom}
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
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>{MyResponsiveBar({ data })}</Paper>
          </Grid>

          <Grid item xs={12} sm={6} className={classes.gridRoot}>
            <Paper className={classes.paper}>
              <div className={classes.snackbarContent}>
                <SnackbarContent
                  className={classes.snackbarRoot}
                  message={'BASE'}
                />
              </div>
              <Box component="div" m={2}>
                <BarSwitch state={switchState} info={groupModeInfo} />
                <span>string optional default:'stacked'</span>
                <Divider className={classes.mgTB} />
                <BarSwitch state={switchState} info={layoutInfo} />
                <span>string optional default:'vertical'</span>
                <Divider className={classes.mgTB} />
                <BarSwitch state={switchState} info={reverseInfo} />
                <Divider className={classes.mgTB} />
                <BarSlider state={sliderState} info={getMinValueNum} />
                <Divider className={classes.mgTB} />
                <BarSlider state={sliderState} info={getMaxValueNum} />
                <Divider className={classes.mgTB} />
                <BarMinMaxValue getMinMaxValue={getMinMaxValue} />
                <Divider className={classes.mgTB} />
                <BarSlider state={sliderState} info={getPaddingNum} />
                <Divider className={classes.mgTB} />
                <BarSlider state={sliderState} info={getInnerPaddingNum} />
                <Divider className={classes.mgTB} />
              </Box>
              <div className={classes.snackbarContent}>
                <SnackbarContent
                  className={classes.snackbarRoot}
                  message={'STYLE'}
                />
              </div>
              <Box component="div" m={2}>
                <BarColors getColors={getColors} />
                <Divider className={classes.mgTB} />
                <BarSlider state={sliderState} info={getBorderRadiusNum} />
                <Divider className={classes.mgTB} />
                <BarSlider state={sliderState} info={getBorderWidthNum} />
                <Divider className={classes.mgTB} />
                <BarColorInput
                  state={colorInputState}
                  info={getBorderColorNum}
                />
              </Box>
              <div className={classes.snackbarContent}>
                <SnackbarContent
                  className={classes.snackbarRoot}
                  message={'LABELS'}
                />
              </div>
              <Box component="div" m={2}>
                <BarColorInput
                  state={colorInputState}
                  info={getLabelTextColorNum}
                />
              </Box>
              <div className={classes.snackbarContent}>
                <SnackbarContent
                  className={classes.snackbarRoot}
                  message={'GRID & AXES'}
                />
              </div>
              <Box component="div" m={2}>
                <BarSwitch state={switchState} info={EnableGridXInfo} />
                <Divider className={classes.mgTB} />
                <BarSwitch state={switchState} info={EnableGridYInfo} />
                <Divider className={classes.mgTB} />
                <BarAxis
                  className={classes.mb}
                  getAxisTop={getAxisTop}
                  getAxisRight={getAxisRight}
                  getAxisLeft={getAxisLeft}
                  getAxisBottom={getAxisBottom}
                />
              </Box>
              <Divider />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <AutoPlaySlick />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>ddddddddddddddddddd</Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Bar;
