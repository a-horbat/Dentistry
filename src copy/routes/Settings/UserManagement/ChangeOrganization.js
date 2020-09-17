import React, { useState } from 'react';
import { useBooleanControls } from '@base86inc/apollo-client';
import { UploadInvoiceImageField } from '@base86inc/apollo-client/build/src/components/UploadContent';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {
  AcceptInviteDocument,
  DeclineInviteDocument,
  PermissionsListDocument,
} from '@base86inc/apollo-client';
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Fab from '../../../components/MuiFab';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Snackbar from '../../../components/Snackbar';
import CheckBoxIn from '../../../components/Icons/CheckboxIn';
import CheckboxOff from '../../../components/Icons/CheckboxOff';
import get from 'lodash/fp/get';
import 'firebase/auth';

const getPermissionsListData = get('permissionsList.data');
const getOrganizationName = get('organization.name');

export const PermissionsList = ({ changeOrgControls }) => {
  const [isSubmitLocked, setSubmitLocked] = useBooleanControls(true);
  const client = useApolloClient();
  const [acceptInvite] = useMutation(AcceptInviteDocument, {
    update: () => client.resetStore(),
  });
  const { data, loading } = useQuery(PermissionsListDocument);
  const permissions = getPermissionsListData(data) || [];

  const [organizations, setOrganizations] = useState([]);

  if (permissions.length !== 0 && organizations.length === 0) {
    const arr = [];
    permissions.forEach(el => {
      arr.push({
        id: el._id,
        companyName: getOrganizationName(el),
        primary: el.primary,
      });
    });
    setOrganizations([...arr]);
  }

  const checkBocksOn = id => {
    const arr = [...organizations];
    let isChanged = false;
    arr.forEach(el => {
      if (el.id === id) {
        if (!el.primary) isChanged = true;
        el.primary = true;
      } else el.primary = false;
    });

    if (isChanged) {
      setOrganizations([...arr]);
      setSubmitLocked.setFalse();
    }
  };

  const submit = () => {
    const org = organizations.find(el => el.primary);
    acceptInvite({ variables: { inviteId: org.id } });
    changeOrgControls.setFalse();
  };

  return (
    <>
      <Box>
        {loading ? (
          <LinearProgress />
        ) : (
          <List>
            {organizations.map(el => (
              <ListItem key={el.id}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Typography>{el.companyName}</Typography>
                  <IconButton onClick={() => checkBocksOn(el.id)}>
                    {el.primary ? <CheckBoxIn /> : <CheckboxOff />}
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <div style={{ paddingBottom: 120 }} />
      <DialogActions className="bottom-actions">
        <Fab color="secondary" onClick={changeOrgControls.setFalse}>
          <CloseIcon />
        </Fab>
        <Box flexGrow={1} />
        <Fab
          color="secondary"
          disabled={loading || isSubmitLocked}
          onClick={submit}
        >
          <CheckIcon />
        </Fab>
      </DialogActions>
    </>
  );
};

export const ChangeOrganizationDrawer = ({
  changeOrgOpen,
  changeOrgControls,
  error,
}) => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={changeOrgOpen}
      onClose={changeOrgControls.setFalse}
      onOpen={changeOrgControls.setTrue}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: 'drawer-radius container' }}
    >
      <DialogTitle id="alert-dialog-title" style={{ paddingBottom: 0 }}>
        <span className="drawer-notch" />
        Choose organization
      </DialogTitle>
      <Box>
        <Snackbar message={error && error.message} variant="error" />
        <div style={{ paddingBottom: 120 }} />
      </Box>
      <DialogActions className="bottom-actions" style={{ padding: 24 }}>
        <Fab color="secondary" onClick={changeOrgControls.setFalse}>
          <CloseIcon />
        </Fab>
        <Box flexGrow={1} />
        {/* <Fab color="secondary" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={16} /> : <CheckIcon />}
        </Fab> */}
      </DialogActions>
    </SwipeableDrawer>
  );
};
