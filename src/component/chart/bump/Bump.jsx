import { React } from 'react';
import { ResponsiveAreaBump } from '@nivo/bump';
import { data } from 'component/chart/bump/BumpDate';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  // paper: {
  //   height: 250,
  //   width: 1200,
  // },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 340,
    width: 1100,
  },
  control: {
    padding: theme.spacing(2),
    top: '46px',
    bottom: '0px',
    width: '100%',
  },
}));

const Bump = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container>
              <Grid item>
                <FormLabel>spacing</FormLabel>
                <Paper className={classes.paper}>
                  <ResponsiveAreaBump
                    data={data}
                    margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
                    spacing={12}
                    colors={{ scheme: 'nivo' }}
                    blendMode="multiply"
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
                          id: 'CoffeeScript',
                        },
                        id: 'dots',
                      },
                      {
                        match: {
                          id: 'TypeScript',
                        },
                        id: 'lines',
                      },
                    ]}
                    startLabel="id"
                    axisTop={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: '',
                      legendPosition: 'middle',
                      legendOffset: -36,
                    }}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: '',
                      legendPosition: 'middle',
                      legendOffset: 32,
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={6}>
            <Grid item>
              <Paper className={classes.paper}>
                <ResponsiveAreaBump
                  data={data}
                  margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
                  spacing={8}
                  colors={{ scheme: 'nivo' }}
                  blendMode="multiply"
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
                        id: 'CoffeeScript',
                      },
                      id: 'dots',
                    },
                    {
                      match: {
                        id: 'TypeScript',
                      },
                      id: 'lines',
                    },
                  ]}
                  startLabel="id"
                  axisTop={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -36,
                  }}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: 32,
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
    </>
  );
};

export default Bump;
