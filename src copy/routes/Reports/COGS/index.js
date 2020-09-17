import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import React, { useEffect, useRef, useState } from 'react';
import MainMenu from '../../../components/Menu';
import { usePersistentMenuStyles } from '../../../components/Menu/usePersistentMenuStyles';
import Nav from '../../../components/Nav';
import COGSIcon from '../../../components/MenuIcons/COGS';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { useChart, chartOptions, SelectTimeFrame } from '../helpers';

export default ({ menu = <MainMenu /> }) => {
  const [timeFrame, setTimeFrame] = useState(30);
  const [{ loading }, chartEl] = useChart(chartOptions, [timeFrame]);
  const classes = usePersistentMenuStyles();

  return (
    <Box
      className={classes.mainContainer}
      display="flex"
      flexDirection="column"
      style={{ height: '100vh' }}
    >
      <Nav title="COGS" />
      {loading && <LinearProgress variant="indeterminate" />}
      <SelectTimeFrame timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
      <Box pr={2} pb={2} flexGrow={1}>
        <canvas id="chart" ref={chartEl} />
      </Box>
      {/* <Box flexGrow={1} textAlign="center" pt={4}>
        <Typography style={{ color: "#bdbdbd" }}>
          <COGSIcon style={{ height: 120, width: 120 }} />
        </Typography>
        <Typography>
          There is nothing here.
        </Typography>
      </Box> */}
      <Hidden mdUp>
        {/* <div style={{ paddingBottom: 120 }} /> */}
        <div
          style={{
            position: 'fixed',
            padding: 24,
            bottom: 0,
            left: 0,
            zIndex: 11,
          }}
        >
          {menu}
        </div>
      </Hidden>
    </Box>
  );
};
