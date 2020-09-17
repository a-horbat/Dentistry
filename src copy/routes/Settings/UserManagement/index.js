import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import {
  useBooleanControls,
  OrganizationListDocument,
  InviteUserDocument,
  UpdateOrganizationDocument,
} from '@base86inc/apollo-client';
import React, { useState, useMemo } from 'react';
import MainMenu from '../../../components/Menu';
import { usePersistentMenuStyles } from '../../../components/Menu/usePersistentMenuStyles';
import Nav from '../../../components/Nav';
import NavSearch from '../../../components/NavSearch';
import Fab from '@material-ui/core/Fab';
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from '@material-ui/core/AppBar';
import AddIcon from '@material-ui/icons/Add';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { UserListDisplay } from './List';
import { InviteUserDrawer } from './Invite';
import { ChangeOrganizationDrawer } from './ChangeOrganization';
import EditOrganizationDrawer from './EditOrganizationDrawer';
import get from 'lodash/get';
import OrganizationName from './OrganizationName';
import { Typography } from '@material-ui/core';

export default () => {
  const classes = usePersistentMenuStyles();
  const { data, loading } = useQuery(OrganizationListDocument);
  const [inviteUser, invite] = useMutation(InviteUserDocument);
  const [changeOrganization, change] = useMutation(UpdateOrganizationDocument);
  const [changeOrgOpen, changeOrgControls] = useBooleanControls(false);
  const [editOrgOpen, editOrgControls] = useBooleanControls(false);
  const [inviteOpen, inviteControls] = useBooleanControls(false);
  const users = get(data, 'organizationList.data[0].accessControls');
  const organizationName = get(data, 'organizationList.data[0].name');
  const organization = get(data, 'organizationList.data[0]');
  //  const organizationName = data ? data.organizationList.data[0].name : "";
  console.log(organization);
  const changeOrganizationName = async (newName) => {
    //organization.name = newName;

    await changeOrganization({
      variables: {
        organizationId: organization._id,
        organization: {
          name: newName,
        },
      },
      refetchQueries: [{ query: OrganizationListDocument }],
    });
  };

  const onResendInvite = () => {
    console.log('resendInvite');
  };

  const onDeactivate = () => {
    console.log('onDeactivate');
  };

  const onSubmit = async (emails) => {
    for (const email of emails) {
      await inviteUser({
        variables: { email, permissions: defaultPermissions },
        refetchQueries: [{ query: OrganizationListDocument }],
        update: inviteControls.setFalse,
      });
    }
  };
  return (
    <>
      <Box className={classes.mainContainer}>
        <AppBar position="sticky" color="inherit">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            width="100%"
            pt={1}
            pb={1}
          >
            <Box>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                Organization
              </Typography>
            </Box>
          </Box>
        </AppBar>

        {loading && <LinearProgress />}
        <OrganizationName
          organizationName={organizationName}
          onChangeOrganization={changeOrgControls.setTrue}
          onEditOrganization={editOrgControls.setTrue}
        />
        <UserListDisplay
          rows={users}
          onChangeOrganization={changeOrgControls.setTrue}
          onResendInvite={onResendInvite}
          onDeactivate={onDeactivate}
        />
        <div style={{ paddingBottom: 120 }} />
        <Hidden mdUp>
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
          <div>
            <Fab color="secondary" onClick={inviteControls.setTrue}>
              <AddIcon />
            </Fab>
          </div>
        </div>
      </Box>
      <InviteUserDrawer
        inviteOpen={inviteOpen}
        inviteControls={inviteControls}
        {...invite}
        onSubmit={onSubmit}
      />
      <ChangeOrganizationDrawer
        changeOrgOpen={changeOrgOpen}
        changeOrgControls={changeOrgControls}
        {...invite}
        onSubmit={onSubmit}
      />
      {organizationName ? (
        <EditOrganizationDrawer
          editOrgOpen={editOrgOpen}
          editOrgControls={editOrgControls}
          organizationName={organizationName}
          changeOrganizationName={changeOrganizationName}
        />
      ) : null}
    </>
  );
};

const defaultPermissions = {
  readUser: true,
  writeUser: true,
  readInvoice: true,
  writeInvoice: true,
  readVendor: true,
  writeVendor: true,
  readProduct: true,
  writeProduct: true,
  readBilling: true,
  writeBilling: true,
};
