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
  Typography,
} from '@material-ui/core';
import {
  BarSwitch,
  BarSlider,
  BarMinMaxValue,
  BarColors,
  BarColorInput,
  BarAxis,
} from 'component/chart/bar/BarController';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 300,
    width: '100%',
    overflow: 'auto',
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
  mgT: {
    marginTop: 0,
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
            <h5 className={classes.mgT}>GroupMode</h5>
            <span>string optional default:'stacked'</span>
            <BarSwitch state={switchState} info={groupModeInfo} />
            <Typography paragraph>How to group bars</Typography>

            <Divider className={classes.mgTB} />

            <h5 className={classes.mgT}>Layout</h5>
            <span>string optional default:'vertical'</span>
            <BarSwitch state={switchState} info={layoutInfo} />
            <Typography paragraph>How to display bars</Typography>
            <Divider className={classes.mgTB} />
            <h5 className={classes.mgT}>Reverse</h5>
            <span>boolean optional default:false</span>
            <BarSwitch state={switchState} info={reverseInfo} />
            <Typography paragraph>
              Reverse bars, starts on top instead of bottom for vertical layout
              and right instead of left for horizontal one.
            </Typography>
            <Divider className={classes.mgTB} />
            <h5 className={classes.mgT}>MinValue</h5>
            <span>number | string optional default:'auto'</span>
            <BarSlider state={sliderState} info={getMinValueNum} />
            <Typography paragraph>Minimum value</Typography>
            <Divider className={classes.mgTB} />
            <h5 className={classes.mgT}>MaxValue</h5>
            <span>number | string optional default:'auto'</span>
            <BarSlider state={sliderState} info={getMaxValueNum} />
            <Typography paragraph>Maximum value</Typography>
            <Divider className={classes.mgTB} />
            <h5 className={classes.mgT}>MinMaxValue</h5>
            <span>number | string optional default:'auto'</span>
            <BarMinMaxValue getMinMaxValue={getMinMaxValue} />
            <Typography paragraph>Minimum & Maximum value</Typography>
            <Divider className={classes.mgTB} />
            <h5 className={classes.mgT}>Padding</h5>
            <Typography paragraph>number optional default:0.1</Typography>
            <BarSlider state={sliderState} info={getPaddingNum} />
            <Typography paragraph>Padding between each bar (ratio)</Typography>
            <Divider className={classes.mgTB} />
            <h5 className={classes.mgT}>InnerPadding</h5>
            <span>number optional default:1</span>
            <BarSlider state={sliderState} info={getInnerPaddingNum} />
            <Typography paragraph>
              Padding between grouped/stacked bars
            </Typography>
            <Divider className={classes.mgTB} />
          </Box>
          <div className={classes.snackbarContent}>
            <SnackbarContent
              className={classes.snackbarRoot}
              message={'STYLE'}
            />
          </div>
          <Box component="div" m={2}>
            <h5 className={classes.mgT}>Color</h5>
            <span>
              string | Function | string[]optionaldefault: 'scheme':'nivo'
            </span>
            <BarColors getColors={getColors} />
            <Typography paragraph>Defines color range</Typography>
            <Divider className={classes.mgTB} />
            <h5 className={classes.mgT}>BorderRadius</h5>
            <span>number optional default:0</span>
            <BarSlider state={sliderState} info={getBorderRadiusNum} />
            <Typography paragraph>Rectangle border radius</Typography>
            <Divider className={classes.mgTB} />
            <h5 className={classes.mgT}>BorderWidth</h5>
            <span>number optional default:0</span>
            <BarSlider state={sliderState} info={getBorderWidthNum} />
            <Typography paragraph>Width of bar border</Typography>
            <Divider className={classes.mgTB} />
            <h5 className={classes.mgT}>BorderColor</h5>
            <span>
              string | object | Functionoptionaldefault:'from':'color'
            </span>
            <BarColorInput state={colorInputState} info={getBorderColorNum} />
            <Typography paragraph>Method to compute border color</Typography>
          </Box>
          <div className={classes.snackbarContent}>
            <SnackbarContent
              className={classes.snackbarRoot}
              message={'LABELS'}
            />
          </div>
          <Box component="div" m={2}>
            <h5 className={classes.mgT}>LabelTextColor</h5>
            <span>string | object | Function optional default:'theme'</span>
            <BarColorInput
              state={colorInputState}
              info={getLabelTextColorNum}
            />
            <Typography paragraph>
              Defines how to compute label text color
            </Typography>
          </Box>
          <div className={classes.snackbarContent}>
            <SnackbarContent
              className={classes.snackbarRoot}
              message={'GRID & AXES'}
            />
          </div>
          <Box component="div" m={2}>
            <h5 className={classes.mgT}>EnableGridX</h5>
            <span>boolean optional default:false</span>
            <BarSwitch state={switchState} info={EnableGridXInfo} />
            <Typography paragraph>Enable/disable x grid</Typography>
            <Divider className={classes.mgTB} />
            <h5 className={classes.mgT}>EnableGridY</h5>
            <span>boolean optional default:true</span>
            <BarSwitch state={switchState} info={EnableGridYInfo} />
            <Typography paragraph> Enable/disable y grid</Typography>
            <Divider className={classes.mgTB} />
            <h5 className={classes.mgT}>Axis</h5>
            <span>accordion & tick rotation</span>
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
    </>
  );
};

export default Bar;
