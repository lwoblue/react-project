import React from 'react';
import { ResponsiveAreaBump } from '@nivo/bump';
import { data } from 'component/chart/bump/BumpDate';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 250,
    width: 1200,
  },

  bumpSize: {
    width: 1200,
    height: 250,
  },
}));

const Bump = () => {
  const classes = useStyles();

  return (
    <>
      {/* <main style={classes.bumpSize}> */}
      <Grid container spacing={2}>
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
      </Grid>
      {/* </main> */}
    </>
  );
};

export default Bump;
