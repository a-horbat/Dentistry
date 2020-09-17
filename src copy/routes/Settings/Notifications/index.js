import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import React, { useState, useEffect } from 'react';
import MainMenu from '../../../components/Menu';
import { usePersistentMenuStyles } from '../../../components/Menu/usePersistentMenuStyles';
import Nav from '../../../components/Nav';
import NotificationsIcon from '../../../components/MenuIcons/Notifications';
import { useBooleanControls } from '@base86inc/apollo-client';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ListItem from '@material-ui/core/ListItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import CheckIcon from '@material-ui/icons/Check';
import Divider from '@material-ui/core/Divider';
import MuiFab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import {
  UserSettingsDocument,
  UpdateUserSettingsDocument,
} from '@base86inc/apollo-client';
import { useQuery, useMutation } from '@apollo/react-hooks';
import isNumber from 'lodash/isNumber';
import get from 'lodash/get';

export const Fab = withStyles(theme => ({
  root: {
    '&.Mui-disabled': {
      backgroundColor: '#FFCCC6',
      color: 'white',
    },
  },
}))(MuiFab);

const DEFAULT_THRESHOLD = 15;

export default () => {
  const { data, loading, networkStatus } = useQuery(UserSettingsDocument, {
    notifyOnNetworkStatusChange: true,
  });
  const [updateUserSettings, update] = useMutation(UpdateUserSettingsDocument);
  const [settings, setSettings] = useState(get(data, 'userSettings'));
  const [isSubmitLocked, setSubmitLocked] = useBooleanControls(true);
  const notificationsEmail = get(settings, 'notificationsEmail') || false;
  const notificationsSMS = get(settings, 'notificationsSMS') || false;
  const defaultThreshold = isNumber(get(settings, 'defaultThreshold'))
    ? get(settings, 'defaultThreshold')
    : DEFAULT_THRESHOLD;
  const classes = usePersistentMenuStyles();
  const onSubmit = async ev => {
    ev.preventDefault();
    await handleChange({
      notificationsEmail,
      notificationsSMS,
      defaultThreshold,
    });
    setSubmitLocked.setTrue();
  };
  const handleChange = newSettings => {
    updateUserSettings({
      variables: {
        settings: newSettings,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateUserSettings: {
          __typename: 'UserSettings',
          ...settings,
          ...newSettings,
        },
      },
    });
    setSubmitLocked.setFalse();
  };
  const handleNumberChange = name => (ev, value) => {
    setSettings(s => ({ ...s, [name]: value }));
    setSubmitLocked.setFalse();
  };
  const handleBooleanChange = name => ev => {
    const value = Boolean(ev.target.checked);
    setSettings(s => ({ ...s, [name]: value }));
    setSubmitLocked.setFalse();
  };

  useEffect(() => {
    setSettings(get(data, 'userSettings'));
  }, [data]);

  return (
    <Box className={classes.mainContainer}>
      <Nav title="Notifications" />
      {(loading || update.loading) && <LinearProgress />}
      <Box flexGrow={1}>
        {loading ? null : (
          <form id="notifications-form" onSubmit={onSubmit}>
            <ListItem button>
              <FormControlLabel
                classes={{ root: 'filter-label' }}
                control={
                  <Switch
                    checked={notificationsEmail || false}
                    onChange={handleBooleanChange('notificationsEmail')}
                    value="emailNotifications"
                  />
                }
                label={<Box>Notifications via Email</Box>}
                labelPlacement="start"
              />
            </ListItem>
            <ListItem button>
              <FormControlLabel
                classes={{ root: 'filter-label' }}
                labelPlacement="start"
                control={
                  <Switch
                    checked={notificationsSMS || false}
                    onChange={handleBooleanChange('notificationsSMS')}
                    value="smsNotifications"
                  />
                }
                label={<Box>Notifications via SMS</Box>}
              />
            </ListItem>
            <Box mb={3} px={2}>
              <Divider />
            </Box>
            <Box px={2}>
              <Typography variant="h6">
                Smart Alert Default Threshold
              </Typography>
              <Typography>Smart Alert Default Threshold</Typography>
            </Box>
            <Box my={5} px={2}>
              <Slider
                name="defaultThreshold"
                defaultValue={DEFAULT_THRESHOLD}
                onChange={handleNumberChange('defaultThreshold')}
                value={defaultThreshold}
                min={0}
                max={100}
                valueLabelFormat={value => `${value}%`}
                valueLabelDisplay="on"
              />
            </Box>
          </form>
        )}
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
      <div
        style={{
          position: 'fixed',
          padding: 24,
          bottom: 0,
          right: 0,
          zIndex: 11,
        }}
      >
        <Fab
          color="secondary"
          type="submit"
          form="notifications-form"
          disabled={loading || update.loading || isSubmitLocked}
        >
          <CheckIcon />
        </Fab>
      </div>
    </Box>
  );
};
