import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { useState, useEffect } from 'react';
import MainMenu from '../../../components/Menu';
import { usePersistentMenuStyles } from '../../../components/Menu/usePersistentMenuStyles';
import Nav from '../../../components/Nav';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useAsyncMethod } from '@base86inc/apollo-client';

export default () => {
  const classes = usePersistentMenuStyles();
  const [expanded, setExpanded] = useState('');
  const handleChange = name => () => setExpanded(expanded === name ? '' : name);

  const [{ data, loading }, loadFaqs] = useAsyncMethod(() => import('./faqs'));
  useEffect(() => {
    loadFaqs();
  }, []);

  return (
    <Box className={classes.mainContainer}>
      <Nav title="FAQ" />
      {loading && <LinearProgress variant="indeterminate" />}
      <Box flexGrow={1}>
        {((data && data.faqs) || []).map(({ name, secondary, content }) => (
          <ExpansionPanel
            key={name}
            expanded={expanded === name}
            onChange={handleChange(name)}
            square
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${name}-content`}
              id={`${name}-header`}
            >
              <Typography className={classes.heading}>{name}</Typography>
              <Typography className={classes.secondaryHeading}>
                {secondary}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{content}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </Box>
      <Hidden mdUp>
        <div style={{ paddingBottom: 120 }} />
        <div
          style={{
            position: 'fixed',
            padding: 24,
            bottom: 0,
            left: 0,
            zIndex: 11,
          }}
        >
          <MainMenu />
        </div>
      </Hidden>
    </Box>
  );
};
