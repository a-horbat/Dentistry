import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import cn from 'classnames';
import Info from '../../assets/Icons/Info';
import ContactForm from './ContactForm';
import MainLayoutStyles from '../../layouts/MainLayout/MainLayoutStyles';

const questions = [
  {
    questionHeader: 'Question One',
    questionBody:
      'Original upholstery: Luna by Gabriel  Composition: 90% Wool of New Zealand, 10% Polyamide Contact us to choose different options. ',
  },
  {
    questionHeader: 'Question Two',
    questionBody:
      'Original upholstery: Luna by Gabriel  Composition: 90% Wool of New Zealand, 10% Polyamide Contact us to choose different options. ',
  },
  {
    questionHeader: 'Question Three',
    questionBody:
      'Original upholstery: Luna by Gabriel  Composition: 90% Wool of New Zealand, 10% Polyamide Contact us to choose different options. ',
  },
  {
    questionHeader: 'Question Four',
    questionBody:
      'Original upholstery: Luna by Gabriel  Composition: 90% Wool of New Zealand, 10% Polyamide Contact us to choose different options. ',
  },
];

export default () => {
  const classes = MainLayoutStyles();

  const [listState, setListState] = useState([]);

  useEffect(() => {
    setListState(
      questions.map((element) => {
        return false;
      }),
    );
  }, []);

  const handleListClick = (index) => {
    setListState(
      listState.map((item, i) => {
        if (index === i) item = !item;
        return item;
      }),
    );
  };

  return (
    <Grid
      container
      justifyContent="center"
      className={classes.bodyGrid__container}
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <Grid
        container
        spacing={4}
        style={{ height: 'fit-content', margin: 16, marginTop: 0 }}
      >
        <Grid item xs={12}>
          <Box className={classes.bodyGrid__itemTitle}>
            <Typography variant="h1">Help</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Paper
            className={cn(
              classes.bodyGrid__itemPaper,
              classes.bodyGrid__itemPaperWithTitle,
            )}
            style={{ padding: 0, height: 'unset' }}
          >
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '32px',
                height: '69px',
              }}
            >
              <Info />
              <Typography
                style={{
                  marginLeft: '16px',
                  fontFamily: 'Comfortaa',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: '22px',
                  color: '#333333',
                  lineHeight: '24px',
                }}
              >
                FAQ
              </Typography>
            </Box>
            <Divider />
            <Box>
              <List disablePadding className={classes.FAQList}>
                {questions.map((question, i) => (
                  <Box className={listState[i] ? classes.FAQOpenedList : ''}>
                    <ListItem
                      key={question.questionHeader}
                      button
                      onClick={() => handleListClick(i)}
                      style={{
                        padding: '16px 32px 12px 32px',
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                      >
                        <Typography
                          style={{
                            fontFamily: 'Poppins',
                            fontWeight: 500,
                            fontSize: '16px',
                            lineHeight: '24px',
                          }}
                        >
                          {question.questionHeader}
                        </Typography>
                        {listState[i] ? (
                          <ExpandLess color="primary" />
                        ) : (
                          <ExpandMore className={classes.expandedIcon} />
                        )}
                      </Box>
                    </ListItem>
                    <Collapse in={listState[i]} timeout="auto" unmountOnExit>
                      <Box pl={4} pr={4} pb={2}>
                        <Typography
                          style={{
                            fontFamily: 'Poppins',
                            fontSize: '14px',
                            lineHeight: '22px',
                          }}
                        >
                          {question.questionBody}
                        </Typography>
                      </Box>
                    </Collapse>
                    <Divider />
                  </Box>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Box className={classes.bodyGrid__ItemTitle} />
          <ContactForm />
        </Grid>
      </Grid>
    </Grid>
  );
};
